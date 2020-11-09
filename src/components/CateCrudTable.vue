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
      item-key="name"
      :footer-props="{
        itemsPerPageText: '每页显示行数'
      }"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title class="tool-title-cn">档案 材料 信息 维护</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-btn @click="handleBatch">批量录入</v-btn>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="550px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                style="marginRight:20px"
                v-bind="attrs"
                v-on="on"
              >新 增</v-btn>

              <!-- <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >批 量 录 入</v-btn> -->
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
                        label="档案所属人"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.calories"
                        label="材料名称"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="份数"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.protein"
                        label="页数"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.time"
                        label="材料形成时间"
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
      <!-- <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">{{ item.name }}
          的档案变动详情：
          <v-row>aaa</v-row>
        </td>
      </template> -->
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >Reset</v-btn>
      </template>
    </v-data-table>

    <v-dialog
      :value="showBatch"
      max-width="550px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="avalue"
                  :items="['张三', '李四', '马田', '刘思龄', '张佳同', '梁靖康', '林潇', '张伟']"
                  attach
                  chips
                  label="请选择"
                  multiple
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.calories"
                  label="材料名称"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.carbs"
                  label="份数"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.protein"
                  label="页数"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.time"
                  label="材料形成时间"
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
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    expanded: [],
    headers: [
      {
        text: '档案所属人',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '材料名称', value: 'calories' },
      { text: '份数', value: 'carbs' },
      { text: '每份页数', value: 'protein' },
      { text: '材料形成时间', value: 'time' },
      { text: '操作', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: '',
      carbs: '',
      protein: '',
      time: ''
    },
    defaultItem: {
      name: '',
      calories: '',
      carbs: '',
      protein: '',
      time: ''
    },
    addItem: {
      name: '',
      calories: '',
      carbs: '',
      protein: '',
      time: ''
    },
    snackbar: false,
    text: 'Hello, I\'m a snackbar',
    showBatch: false,
    avalue: []
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
          calories: '群团组织推荐表',
          carbs: 1,
          protein: 2,
          time: '2018-06-17',
        },
        {
          name: '马田',
          calories: '群团组织推荐表',
          carbs: 5,
          protein: 2,
          time: '2019-06-20'
        },
        {
          name: '梁靖康',
          calories: '政治审查情况的报告',
          carbs: 5,
          protein: 6,
          time: '2019-06-20'
        },
        {
          name: '林潇',
          calories: '自传',
          carbs: 3,
          protein: 1,
          time: '2018-07-21'
        },
        {
          name: '张伟',
          calories: '综合审查表',
          carbs: 2,
          protein: 2,
          time: '2017-09-11'
        },
        {
          name: '刘思龄',
          calories: '履历材料',
          carbs: 1,
          protein: 3,
          time: '2017-04-15'
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
      confirm('确认要删除吗？') && this.desserts.splice(index, 1)
      this.text = '删除成功！'
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.showBatch) {
        this.desserts.push({
          name: '张三',
          calories: '入党申请书',
          carbs: 2,
          protein: 2,
          time: '2020-06-20'
        },
          {
            name: '李四',
            calories: '入党申请书',
            carbs: 2,
            protein: 2,
            time: '2020-06-20'
          })
        this.close()

        this.snackbar = true
        this.text = '保存成功！'
        this.showBatch = false
        return false
      }
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }

      this.close()
      this.snackbar = true
      this.text = '保存成功！'
    },
    handleBatch() {
      this.showBatch = true
    }
  },
}
</script>

<style lang="scss" scoped>
.tool-title-cn {
  font-weight: 600;
}
</style>