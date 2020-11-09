<template>
  <div style="width: 100%">
    <v-snackbar
      top
      color="success"
      v-model="snackbar"
      timeout="1200"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      single-expand
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      :footer-props= "{
        itemsPerPageText: '每页显示行数'
      }"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title class="tool-title-cn">档案 变动 详情</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >档 案 变 动 录 入</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="档案变动人"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.calories"
                        label="档案变动时间"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <!-- <v-text-field
                        v-model="editedItem.fat"
                        label="档案变动类型"
                      ></v-text-field> -->
                      <v-select
                        v-model="editedItem.fat"
                        :items="fatItems"
                        label="档案变动类型"
                      ></v-select>
                    </v-col>

                      
                    <!-- </div> -->
                  </v-row>
                  <v-row v-if="editedItem.fat==='档案新增（接受）'">
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-for="(item, index) in quesList"
                        :key="index"
                      >
                        <v-text-field
                          v-model="editedItem.ext[index]"
                          :label="item"
                        ></v-text-field>
                      </v-col>
                  </v-row>
                  <v-row v-if="editedItem.fat==='档案内调'||editedItem.fat==='档案系统内调动'">
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-for="(item, index) in ndList"
                        :key="index"
                      >
                        <v-text-field
                          v-model="editedItem.ext[index]"
                          :label="item"
                        ></v-text-field>
                      </v-col>
                  </v-row>
                  <!-- <v-row v-if="editedItem.fat==='档案系统内调'">
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-for="(item, index) in ndList"
                        :key="index"
                      >
                        <v-text-field
                          v-model="editedItem.ext[index]"
                          :label="item"
                        ></v-text-field>
                      </v-col>
                  </v-row> -->
                  <v-row v-if="editedItem.fat==='档案转递（发）'">
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-for="(item, index) in zdfList"
                        :key="index"
                      >
                        <v-text-field
                          v-model="editedItem.ext[index]"
                          :label="item"
                        ></v-text-field>
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >取消</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="container-change">
            <p class="title-head">{{ item.name }}的档案变动详情：</p>
            <v-row v-if="item.fat === '档案新增（接受）'">
              <v-col cols="4" v-for="(value, index) in item.ext" :key="index">
                <span>{{quesList[index]}}: </span><span>{{value}}</span>
              </v-col>
            </v-row>
            <v-row v-if="item.fat === '档案系统内调动'">
              <v-col cols="4" v-for="(value, index) in item.ext" :key="index">
                <span>{{ndList[index]}}: </span><span>{{value}}</span>
              </v-col>
            </v-row>
            <v-row v-if="item.fat === '档案转递（发）'">
              <v-col cols="4" v-for="(value, index) in item.ext" :key="index">
                <span>{{zdfList[index]}}: </span><span>{{value}}</span>
              </v-col>
            </v-row>
            <v-row v-if="item.fat === '档案内调'">
              <v-col cols="4" v-for="(value, index) in item.ext" :key="index">
                <span>{{ndList[index]}}: </span><span>{{value}}</span>
              </v-col>
            </v-row>
          </div>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >Reset</v-btn>
      </template>
    </v-data-table>

  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    expanded: [],
    headers: [
      {
        text: '档案变动人',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '档案变动时间', value: 'calories' },
      { text: '档案变动类型', value: 'fat', sortable: false },
      // { text: '档案变动状态', value: 'carbs', sortable: false },
      // { text: 'Protein (g)', value: 'protein' },
      { text: '操作', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
      ext: []
    },
    defaultItem: {
      name: '',
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
      ext: []
    },
    fatItems: [
      '档案内调',
      '档案系统内调动',
      '档案转递（发）',
      '档案新增（接受）'
    ],
    quesList: ['部门编码', '部门名称', '电话', '负责人', '电子邮件', '备注'],
    ndList: ['内调部门编码', '内调部门名称', '电话', '负责人', '原部门名称', '备注'],
    zdfList: ['转寄地址', '派发地', '电话', '联系人', '原部门名称', '派送地', '备注'],
    snackbar: false,
    text: ''
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增' : '编辑'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: '张佳同',
          calories: '2020-06-07',
          fat: '档案内调',
          carbs: 24,
          protein: 4.0,
          ext: ['T158', '技术部门', 15847560215, '刘鑫', '运营部门', '']
        },
        {
          name: '马田',
          calories: '2020-05-04',
          fat: '档案系统内调动',
          carbs: 37,
          protein: 4.3,
          ext: ['T158', '技术部门', 15847560215, '刘鑫', '运营部门', '']
        },
        {
          name: '梁靖康',
          calories: '2020-06-17',
          fat: '档案转递（发）',
          carbs: 23,
          protein: 6.0,
        },
        {
          name: '刘文俊',
          calories: '2019-12-25',
          fat: '档案新增（接受）',
          carbs: 67,
          protein: 4.3,
          ext: ['T109', '人事部', 16875741518, '李华', '156174@163.com', '']
        },
        {
          name: '李威',
          calories: '2019-09-04',
          fat: '档案内调',
          carbs: 87,
          protein: 6.5,
        },
        {
          name: '胡双玉',
          calories: '2020-06-24',
          fat: '档案转递（发）',
          carbs: 51,
          protein: 4.9,
        },
        {
          name: '李梦茜',
          calories: '2020-07-18',
          fat: '档案系统内调动',
          carbs: 65,
          protein: 7,
        },
        {
          name: '刘思龄',
          calories: '2020-09-18',
          fat: '档案系统内调动',
          carbs: 65,
          protein: 7,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('确认要删除吗?') && this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
      this.snackbar = true
      this.text = '保存成功！'
    },
  },
}
</script>

<style lang="scss" scoped>
.tool-title-cn {
  font-weight: 600;
}
.title-head {
  font-size: 20px;
}
.container-change {
  padding: 20px;
}
</style>