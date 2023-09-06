<template>
  <el-form :inline="true">
    <el-form-item :label="`${type}搜索`">
      <el-input v-model="keywords" :placeholder="`请输入要搜索的${type}`"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="!keywords" @click="searchOrReset(keywords)">搜索</el-button>
      <el-button type="warning" @click="searchOrReset('')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAclStore } from '@/store/modules/acl'
const aclStore = useAclStore()
const props = defineProps(['type'])
let keywords = ref<string | undefined>('')
const searchOrReset = (params: string | undefined) => {
  keywords.value = params
  switch (props.type) {
    case '用户名':
      aclStore.getUserPageList(1, 5, 'user', params ? params : undefined)
      break;
    case '职位':
      aclStore.getUserPageList(1, 10, 'role', params ? params : undefined)
      break;
  }
}

</script>

<style lang="scss" scoped></style>