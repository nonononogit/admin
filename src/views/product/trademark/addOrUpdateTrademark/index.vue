<template>
  <el-dialog v-model="dialogFormVisible" :title="form.id ? '修改品牌' : '添加品牌'">
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="form.tmName" placeholder="请输入品牌名称" style="width: 60%;"/>
      </el-form-item>
      <el-form-item label="品牌logo" prop="logoUrl">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddOrUpdateTm(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, FormRules, type UploadProps, type FormInstance } from 'element-plus'
import { RecordsData } from '@/api/acl/user/type';
import tmApi from '@/api/product/trademark/trademark'
import { useTrademarkStore } from '@/store/modules/trademark';
// 获取品牌仓库
const trademarkStore = useTrademarkStore()
// 初始化新增或者更新品牌数据
const form = ref<RecordsData>({
  tmName: '',
  logoUrl: ''
})
// 控制dialog显隐的参考值
const dialogFormVisible = ref(false)
// 表单DOM
const ruleFormRef = ref<FormInstance>()
// 接收父组件传过来的数据
const props = defineProps(['updateTm', 'limit'])
// 图片上传成功的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  _response,
  uploadFile
) => {
  form.value.logoUrl = URL.createObjectURL(uploadFile.raw!)
  ruleFormRef.value?.clearValidate('logoUrl')
}
// 对上传的图片进行校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片仅支持jpg格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('上传的图片大小不能超过2MB!')
    return false
  }
  return true
}
// 上传图片的校验方法
const validateLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌图片'))
  }
}
// 表单校验
const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 1, max: 6, message: '长度保持在1-6个字符', trigger: 'blur' },
  ],
  logoUrl: [
    {
      required: true,
      validator: validateLogoUrl
    },
  ],
})
// 点击确认
const confirmAddOrUpdateTm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, _fields) => {
    if (valid) {
      await tmApi.reqAddOrUpdateTm(form.value)
      ElMessage.success(form.value.id ? '修改品牌成功' : '添加品牌成功')
      dialogFormVisible.value = false
      trademarkStore.getTrademarkLimitList(props.limit?.currentPage, props.limit?.pageSize)
    }
  })
}
// 监听父组件传过来的数据
watch(() => props.updateTm, () => {
  if (props.updateTm?.id) {
    form.value = { ...props.updateTm }
  } else {
    Object.assign(form.value, { tmName: '', logoUrl: '', id: 0 })
  }
  ruleFormRef.value?.clearValidate()
}, { deep: true })
defineExpose({
  dialogFormVisible
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>