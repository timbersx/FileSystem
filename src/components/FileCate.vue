<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <div class="header-title">
      <div class="title-bar">
        <h1 class="stitle">人事档案材料管理-档案材料信息维护</h1>
      </div>
    </div>
    
    <v-row>
      <!-- <crud-table /> -->
      <div class="table-position">
        <crud-table />
      </div>
    </v-row>
  </div>

</template>

<script>
import CrudTable from './CateCrudTable'
export default {
  name: 'HelloWorld',
  components: {
    CrudTable
  },
  data: () => ({
    selection: [],
    items: ['档案新增（接收）', '档案内调', '档案系统内调动', '档案转递（发）'],
  }),
}
</script>

<style lang="scss" scoped>
.app-container {
  margin: 0 0 10px 0;
}
.tool-position {
  width: 800px;
}
.search-position {
}
.table-position {
  margin: 20px 20px;
  width: 100%;
}
.header-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  background-color: #eee;
  padding: 8px 16px;
  border-bottom: solid 1px #dce3e5;
  border-top: solid 1px #dce3e5;
  box-sizing: border-box;
  width: 100%;
  min-height: 60px;
}
.title-bar {
  display: flex;
  flex-direction: row;
  // align-items: center;
  width: 100%;
  // max-width: 1352px;
  padding-left: 50px;
}
.stitle {
  // flex: 1 1;
  font-weight: 500;
  font-size: 30px;
}
</style>
