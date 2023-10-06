<template>
  <div class="trademark-container">
    <el-card>
      <el-button type="primary" @click="addOrUpdateTrademarkEvent" :icon="Plus">添加品牌</el-button>
      <el-table :data="trademarkLimitData.records" border class="el-table-container">
        <el-table-column label="序号" type="index" align="center" width="80">
        </el-table-column>
        <el-table-column prop="tmName" label="品牌名称">
        </el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row }">
            <el-image :src="row.logoUrl" :lazy="true" style="width: 100px;height: 100px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" :icon="Edit" size="small" @click="addOrUpdateTrademarkEvent(row)"></el-button>
            <el-popconfirm :title="`确定要删除${row.tmName}吗？`" @confirm="confirmDelTm(row.id)">
              <template #reference>
                <el-button type="danger" :icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 10]"
        layout="prev, pager, next, jumper,->,sizes,total" :total="trademarkLimitData.total"
        @size-change="handleSizeChange" @current-change="getTmList" />
    </el-card>
    <addOrUpdateTrademark ref="addOrUpdateTrademarkRef" :updateTm="currentTm" :limit="limit"></addOrUpdateTrademark>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { useTrademarkStore } from '@/store/modules/trademark'
import { storeToRefs } from 'pinia';
import addOrUpdateTrademark from './addOrUpdateTrademark/index.vue'
import { RecordsData } from '@/api/acl/user/type';
import tmApi from '@/api/product/trademark/trademark'
import { ElMessage } from 'element-plus';
// 获取品牌管理的仓库
const trademarkStore = useTrademarkStore()
const { trademarkLimitData } = storeToRefs(trademarkStore)
// 初始化分页数据
const currentPage = ref(1)
const pageSize = ref(3)
// 添加或删除品牌的子组件
const addOrUpdateTrademarkRef = ref()
// 初始化传给子组件的分页数据
const limit = ref({
  currentPage: 1,
  pageSize: 3,
})
// 初始化编辑当前品牌
const currentTm = ref()
// 改变每页显示条数
const handleSizeChange = () => {
  getTmList()
}
// 请求品牌分页列表数据的方法
const getTmList = (pager = 1) => {
  currentPage.value = pager
  trademarkStore.getTrademarkLimitList(currentPage.value, pageSize.value)
}
// 点击添加或更新品牌数据
const addOrUpdateTrademarkEvent = (row?: RecordsData) => {
  if (row) currentTm.value = row
  addOrUpdateTrademarkRef.value.dialogFormVisible = true
  limit.value.currentPage = row?.id ? currentPage.value : currentPage.value = 1
  limit.value.pageSize = pageSize.value
}
// 确定删除品牌
const confirmDelTm = async (id: number) => {
  try {
    await tmApi.reqDeleteTm(id)
    ElMessage.success('删除品牌成功')
    getTmList(trademarkLimitData.value.records.length === 1 ? currentPage.value - 1 : currentPage.value)
  } catch (error) {
    ElMessage.error(error as string)
  }

}
onMounted(() => {
  getTmList()
})
</script>

<style lang="scss" scoped>
.el-table-container {
  margin: 15px 0;
}
</style>
