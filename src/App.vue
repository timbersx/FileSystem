<template>
  <v-app>
    <!-- <v-navigation-drawer app>
  </v-navigation-drawer> -->
    <v-system-bar
      app
      color="black"
   
      style="height: 80px"
    >
      <div class="d-flex align-center">
        <span class="title-style">
          <v-icon>PFMS</v-icon> 人事档案管理系统
        </span>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <!-- <span
              class="menu-item"
            >人员管理</span> -->
            <v-btn
              depressed
              small
              v-bind="attrs"
              v-on="on"
              class="btn-item"
            >系统管理</v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="handleMenuClick(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              small
              v-bind="attrs"
              v-on="on"
              class="btn-item"
            >人事档案管理</v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in cateItems"
              :key="index"
              @click="handleMenuClick(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              small
              v-bind="attrs"
              v-on="on"
              class="btn-item"
            >人事档案材料管理</v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in fileItems"
              :key="index"
              @click="handleMenuClick(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        class="right-position"
      >
        <span class="font-menu">人事管理员</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-system-bar>

    <v-main style="marginBottom: 60px">
      <router-link to="/"></router-link>

      <v-fade-transition hide-on-leave>
        <router-view />

      </v-fade-transition>
    </v-main>
    <app-bottom />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import AppBottom from './components/AppBottom';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    AppBottom
  },

  data: () => ({
    //
    items: [
      // { title: '人员信息' },
      // { title: '人员汇总' },
      // { title: '角色管理' }
    ],
    cateItems: [
      { title: '档案类别维护' },
      { title: '人员信息维护' },
      { title: '人事档案变动维护' },
      { title: '人事档案变动查询' },
      { title: '人事档案综合查询' },
    ],
    fileItems: [
      { title: '人事档案材料类别维护' },
      { title: '人事档案材料信息维护' },
      { title: '人事档案材料生成' }
    ]
  }),
  methods: {
    handleMenuClick(item) {
      if (item.title === '人事档案变动维护') {
        this.$router.push({
          path: '/'
        })
      }
      if (item.title === '人事档案材料信息维护') {
        this.$router.push({
          path: '/FileCate'
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title-style {
  font-size: 25px;
  font-weight: 800;
  color: white;
  padding: 0 50px 0 50px;
}
.right-position {
  margin-right: 100px;
  color: white;
}
.font-menu {
  font-size: 16px;
  font-weight: 600;
  color: white;
}
.menu-item {
  padding-left: 35px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}
.btn-item {
  font-weight: 600;
  margin-right: 30px;
}
</style>
