<template>
  <div class="role">
    <Card>
      <Row slot="title"
           class="common-table-title">
        <Col span="12"
             class='title'>
        <CommonIcon :size='16'
                    :type='$route.meta.icon'></CommonIcon>
        {{$route.meta.title}}
        </Col>
        <Col span="12"
             class='action'>
        <Button type="info"
                size="small"
                icon="md-add"
                @click="formOpenModal()">添加</Button>
        <Button type="warning"
                size="small"
                icon="md-sync"
                @click="getData()">刷新</Button>
        </Col>
      </Row>
      <Row class="common-search-box"
           @keydown.enter.native="searchData">
        <Col span="24">
        <!-- <Input v-model="searchFields.name"
               placeholder="请输入角色名称" />
        <Button type="primary"
                icon="search"
                :loading="searchLoading"
                @click='searchData'>搜索</Button> -->
        </Col>
      </Row>
      <Table :loading="tableLoading"
             :columns="tableFieldsRender"
             :data="tableList"></Table>
      <Page class='common-page-box'
            v-if='tableList.length>0'
            show-elevator
            :page-size="pageSize"
            :total="total"
            :current="curPage"
            @on-change="pageChange"
            @on-page-size-change='pageChangeSize'></Page>
      <Modal ref='formModal'
             v-model="formShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             :title='$route.meta.title+"详情"'
             width='300'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="90"
              :model="formModel"
              :rules="formRule">
          <FormItem style='display:none'
                    label="名称："
                    prop="displayName">
            <Input v-model="formModel.displayName"
                   placeholder="请输入名称" />
          </FormItem>
          <FormItem label="角色名称："
                    style='width:200px;'
                    prop="name">
            <Input v-model="formModel.name"
                   @on-change='nameChange'
                   placeholder="请输入角色名称" />
          </FormItem>
          <FormItem label="描述："
                    prop="description">
            <Input v-model="formModel.description"
                   placeholder="请输入描述" />
          </FormItem>
          <FormItem label="状态："
                    prop="isStatic">
            <i-switch v-model="formModel.isStatic" />
          </FormItem>
          <FormItem style='display:none'
                    label="角色permissions："
                    prop="permissions">
            <!-- <Input v-model="formModel.access"
              placeholder="请输入access"/> -->
          </FormItem>
          <FormItem label="默认角色："
                    prop="isDefault ">
            <Checkbox @on-change='allowLateChange'
                      v-model="formModel.isDefault">是</Checkbox>
          </FormItem>
          <!-- <FormItem label="菜单管理："
                    prop="permissions">
            <treeselect placeholder='请选择菜单管理'
                        noResultsText='没有数据'
                        :show-count="true"
                        :multiple="true"
                        v-model="formModel.permissions"
                        :options="permissionsList" />
          </FormItem> -->

        </Form>
      </Modal>
      <Modal ref='formModal'
             v-model="formMenuShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             :title='$route.meta.title+"详情"'
             width='500'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="0"
              :model="formModel"
              :rules="formRule">

          <FormItem prop="permissions">
            <Table border
                   @on-selection-change='tableMenuSelect'
                   ref="selection"
                   :columns="tableMenuFields"
                   :data="tableMenuList"></Table>
            <!-- <treeselect placeholder='请选择菜单管理'
                        noResultsText='没有数据'
                        :show-count="true"
                        :multiple="true"
                        v-model="formModel.permissions"
                        :options="permissionsList" /> -->
          </FormItem>

        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import { mapMutations, mapActions } from 'vuex'
import { getRoleList, getNewPermission } from "@/api/data";


export default {
  mixins: [mixins.commonPage],
  components: {},
  name: 'roles',
  data () {
    return {

      url: "/NewRoles",
      searchFields: {
        name: ""
      },
      tableMenuFields: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: "菜单名称",
        key: "displayName",
        align: "center"
      }, {
        title: "菜单code",
        key: "name",
        align: "center"
      },],
      tableFields: [
        {
          title: "角色名称",
          key: "name",
          align: "center"
        },
        {
          title: "角色描述",
          key: "description",
          align: "center"
        },
        {
          title: "角色状态",
          key: "isStatic",
          align: "center",
          render: (h, params) => {
            return h("span", params.row.isStatic ? '开启' : '关闭');
          }
        },
        // {
        //   title: "角色权限",
        //   key: "permissions",
        //   align: "center"
        // },
      ],
      tableMenuList: [],
      formMenuShow: false,
      formModel: {
        displayName: '',
        name: "",
        description: "",
        isStatic: false,
        permissions: [],
      },
      formRule: {
        name: [{ required: true, message: "角色名称不能为空", }],
      },
      tableFieldsAction: {
        title: "操作",
        key: "action",
        width: 250,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button", {
                props: {
                  icon: "md-create",
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.formMenuOpenModal(params.row[this.aliasId ? this.aliasId : 'id']);
                  }
                }
              },
              "菜单"
            ),
            h(
              "Button", {
                props: {
                  icon: "md-create",
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.formOpenModal(params.row[this.aliasId ? this.aliasId : 'id']);
                  }
                }
              },
              "修改"
            ),
            h(
              "Poptip", {
                props: {
                  confirm: true,
                  title: "您确定要删除这条数据吗?",
                  transfer: true
                },
                on: {
                  "on-ok": () => {
                    this.deleteData(params.row[this.aliasId ? this.aliasId : 'id']);
                  }
                }
              }, [
                h(
                  "Button", {
                    props: {
                      icon: "ios-trash",
                      type: "error",
                      size: "small"
                    }
                  },
                  "删除"
                )
              ]
            )
          ]);
        }
      },
    };
  },
  watch: {

  },
  computed: {

  },
  methods: {
    ...mapActions([
      'getSysMenu',
    ]),
    getFormDataAfter () {
      //处理表格选择框默认选中
      for (let attr in this.$refs['selection'].objData) {
        this.formModel.permissions.forEach((tt) => {
          if (this.$refs['selection'].objData[attr].name == tt) {
            this.$refs['selection'].objData[attr]._isChecked = true;
          }
        })
      }
    },
    tableMenuSelect (selection, row) {
      this.formModel.permissions = selection.map((t) => {
        return t.name
      })
    },
    //关闭表单弹窗
    formCloseModalAfter () {
      //处理表格选择框清空
      for (let attr in this.$refs['selection'].objData) {
        this.$refs['selection'].objData[attr]._isChecked = false;
      }
      this.formMenuShow = false;
      // this.getSysMenu();
      // window.location.reload()
    },
    //打开表单弹窗,id是这条数据的id
    formMenuOpenModal (id) {
      this.formMenuShow = true;
      if (id) {
        this.getFormData(id);
      }
    },
    //处理tree数据格式
    handleTreeData (list) {
      list.forEach((t, i) => {
        t.label = t.displayName;
        t.id = t.name;
        if (t.children && t.children.length > 0) {
          this.handleTreeData(t.children);
        } else {
          t.children = '';
        }
      })
    },
    getNewPermission () {
      getNewPermission().then((res) => {
        // this.handleTreeData(res.data.children)
        this.tableMenuList = res.data.children;
      })
    },
    nameChange () {
      this.formModel.displayName = this.formModel.name;
    },
    //允许迟到选择框切换触发
    allowLateChange () {
      this.formModel.lateTime = 0;
    },
  },
  mounted () {
    this.getNewPermission();

  }
};
</script>
<style lang="less" scoped>
</style>
