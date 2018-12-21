
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
      <Row>
        <Col span="24">
        <Spin fix
              v-if='tableLoading'></Spin>
        <Tree style='width:500px;'
              :data="treeData"
              :render="renderContent"></Tree>
        </Col>
      </Row>
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
          <FormItem label="部门名称："
                    prop="departName">
            <Input v-model="formModel.departName"
                   placeholder="请输入部门名称" />
          </FormItem>
          <FormItem style='display:none'
                    label="父级id："
                    prop="parentId">
            <Input v-model="formModel.parentId"
                   placeholder="请输入父级id" />
          </FormItem>
        </Form>
      </Modal>

    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import axios from '@/libs/api.request'
export default {
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: '/departInfo',
      treeCurrentData: {}, //临时存放当前点击的树节点
      formModel: {
        departName: "",
        parentId: '',
      },
      //树配置
      treeData: [
        {
          title: '部门树',
          expand: true,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [
                    h('Button', {
                      props: {
                        type: 'success',
                        size: 'small',
                      },
                      style: {
                        width: '64px'
                      },
                      on: {
                        click: () => {
                          this.treeCurrentData = { root, node, data };
                          this.formOpenModal();
                        }
                      }
                    }, '新增')
                  ])
              ]);
          },
          children: []
        }
      ],
    };
  },
  computed: {},
  methods: {
    //tree右侧的按钮
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.treeCurrentData = { root, node, data };
                    this.formOpenModal(data.id);
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.treeCurrentData = { root, node, data };
                    this.formModel.parentId = data.id
                    this.formOpenModal();
                  }
                }
              }, '新增'),
              h(
                "Poptip", {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      if (data.children && data.children.length > 0) {
                        this.$Message.warning('有子节点，不能删除');
                        return false;
                      }
                      this.treeCurrentData = { root, node, data };
                      this.deleteData(data.id);

                    }
                  }
                }, [
                  h(
                    "Button", {
                      props: {
                        type: 'error',
                        size: 'small',
                      }
                    },
                    "删除"
                  )
                ]
              ),
            ])
        ]);
    },
    //树新增节点dom操作
    append (data, id) {
      data.expand = true;
      const children = data.children || [];
      children.push({
        id: id,
        title: this.formModel.departName,
        parentId: this.formModel.parentId,
        expand: false
      });
      this.$set(data, 'children', children);
    },
    //树删除节点dom操作
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    getData () {
      this.tableLoading = true
      axios.request({
        url: `${this.url}/getTree`,
        method: 'get',
        params: {
          ...this.searchFields,
          curPage: this.curPage,
          pageSize: this.pageSize,
        }
      }).then((res) => {
        this.tableLoading = false;
        this.searchLoading = false;
        this.handleTreeData(res.data);
        this.treeData[0].children = res.data;
        this.total = res.total;
      }).catch((res) => {
        this.tableLoading = false;
        this.searchLoading = false;
      })

    },
    //处理tree数据格式
    handleTreeData (list) {
      list.forEach((t, i) => {
        t.title = t.departName;
        t.expand = false;
        if (t.children && t.children.length > 0) {
          this.handleTreeData(t.children);
        } else {
          t.children = '';
        }
      })
    },

    //新增数据
    createData () {
      axios.request({
        url: `${this.url}/post`,
        method: 'post',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('添加成功');
        this.append(this.treeCurrentData.data, res.data.id);
        this.formCloseModal();
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
    //删除数据
    deleteData (id) {
      this.tableLoading = true;
      axios.request({
        url: `${this.url}/delete/${id}`,
        method: 'delete',
      }).then((res) => {
        this.tableLoading = false;
        this.$Message.success('删除成功');
        if (this.curPageState) {
          this.curPage = this.curPage - 1;
        }
        this.remove(this.treeCurrentData.root, this.treeCurrentData.node, this.treeCurrentData.data);
      }).catch((res) => {
        this.tableLoading = false;
      })
    },
    //修改数据
    updateData () {
      axios.request({
        url: `${this.url}/put/${this.formModel.id}`,
        method: 'put',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('修改成功');
        this.treeCurrentData.data.title = this.formModel.departName;
        this.treeCurrentData.data.departName = this.formModel.departName;
        this.formCloseModal();
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
</style>
