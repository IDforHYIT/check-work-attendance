// import Lrz from 'lrz'
import axios from '@/libs/api.request'
import moment from "moment";
export default {
  commonPage: {
    data() {
      return {
        curPage: 1, //页码
        pageSize: 10, //数据每页个数
        total: 0, //数据总数
        tableFields: [], //表格配置
        tableLoading: false, //表格loading
        tableList: [], //表格数据
        tableSelection: [], //表格多选状态下选中的对象数组
        tableFieldsAction: { //表格操作按钮
          title: "操作",
          key: "action",
          width: 170,
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
        formModel: {}, //表单模型
        formRule: {}, //表单规则
        formShow: false, //表单对话框是否显示
        formLoading: false, //表单loading
        formSubmitLoading: false, //表单提交数据loading
        modalButtonShowLoading: true, //表单对话框点击底部确定按钮是否显示loading       
        searchFields: {}, //搜索表单模型
        searchLoading: false, //搜索loading
        daterange: [], //时间段组件的value数组
        daterangeOptions: { //时间段组件拓展对象（左侧菜单显示）
          shortcuts: [{
              text: '一星期前',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '一个月前',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '三个月前',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        },

      }
    },
    computed: {
      //合并表格组件配置
      tableFieldsRender() {
        var arr = this.tableFields
        // if (this.tableFieldsAction.title) {
        arr.push(this.tableFieldsAction)
        // }
        return arr
      },
      //删除后当前页切换，判断当前页面是否有数据，没有就跳上一页，第一页不跳。 返回布尔值
      curPageState() {
        return this.total / this.pageSize < this.curPage && this.curPage != 1
      }
    },
    watch: {
      //监听日期选择器的变化
      'daterange'(dateRangeArr) {
        if (dateRangeArr[0] != '') {
          this.searchFields['startDate'] = moment(dateRangeArr[0]).format("YYYY-MM-DD")
          this.searchFields['endDate'] = moment(dateRangeArr[1]).format("YYYY-MM-DD")
        } else {
          this.searchFields['startDate'] = ''
          this.searchFields['endDate'] = ''
        }
      }
    },
    mounted() {
      if (!this.noMounted) {
        this.getData();
      }

    },
    methods: {
      //导出表格
      exportTableData() {
        this.$refs.table.exportCsv({
          filename: this.$route.meta.title,
          columns: this.tableFields.filter((col, index) => {
            if (col.key != 'action') {
              return col
            }
          }),
          data: this.tableList.filter((data, index) => {
            return data;
          })
        });
      },
      //批量删除表格数据
      deleteAllListData() {
        if (this.tableSelection.length > 0) {
          this.tableLoading = true;
          axios.request({
            url: `${this.url}/deleteAll`,
            method: 'delete',
            data: {
              ids: this.tableSelection.map((t) => {
                return t.id
              })
            }
          }).then((res) => {
            this.tableLoading = false;
            this.$Message.success('删除成功');
            if (this.curPageState) {
              this.curPage = this.curPage - 1;
            }
            this.getData();
          }).catch((res) => {
            this.tableLoading = false;
          })
        } else {
          this.$Message.warning('未选择');
        }
      },
      //提交数据（新增/修改数据触发按钮）
      submitData() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.formSubmitLoading = true;
            this.submitDataBefore && this.submitDataBefore();
            this.formModel.id ? this.updateData() : this.createData()
            this.submitDataAfter && this.submitDataAfter();
          } else {
            //处理点击确定按钮时验证不通过 loading一直显示的问题
            this.modalButtonShowLoadingReset();
            // this.$Message.error('验证失败！');
          }
        })
      },
      //新增数据
      createData() {
        axios.request({
          url: `${this.url}/post`,
          method: 'post',
          data: this.formModel
        }).then((res) => {
          this.$Message.success('添加成功');
          this.formCloseModal();
          this.getData();
        }).catch((res) => {
          this.formSubmitLoading = false;
          this.modalButtonShowLoadingReset();
        })
      },
      //删除数据
      deleteData(id) {
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
          this.getData();
        }).catch((res) => {
          this.tableLoading = false;

        })
      },
      //修改数据
      updateData() {
        axios.request({
          url: `${this.url}/put/${this.aliasId?this.formModel[this.aliasId]:this.formModel.id}`,
          method: 'put',
          data: this.formModel
        }).then((res) => {
          this.$Message.success('修改成功');
          this.formCloseModal();
          this.getData();
          this.updateDataAfter && this.updateDataAfter();
        }).catch((res) => {
          this.formSubmitLoading = false;
          this.modalButtonShowLoadingReset();
        })
      },
      //获取列表数据
      getData() {
        this.tableLoading = true
        axios.request({
          url: `${this.url}/get`,
          method: 'get',
          params: {
            ...this.searchFields,
            curPage: this.curPage,
            pageSize: this.pageSize,
          }
        }).then((res) => {
          this.tableLoading = false;
          this.searchLoading = false;
          this.tableList = res.data;
          this.total = res.total;
        }).catch((res) => {
          this.tableLoading = false;
          this.searchLoading = false;
        })
      },
      //获取表单数据
      getFormData(id) {
        this.formLoading = true;
        axios.request({
          url: `${this.url}/get/${id?id:''}`,
          method: 'get',
        }).then((res) => {
          this.formLoading = false;
          this.formModel.id = '';
          for (let attr in this.formModel) {
            this.formModel[attr] = res.data[attr];
          }
          this.getFormDataAfter && this.getFormDataAfter();
        }).catch((res) => {
          this.formLoading = false;
        })
      },
      //重置弹窗底部按钮loading(处理点击确定按钮时验证不通过 loading一直显示的问题)
      modalButtonShowLoadingReset() {
        this.modalButtonShowLoading = false;
        this.$nextTick(() => {
          this.modalButtonShowLoading = true;
        })
      },
      //表格多选发生变化时就会触发
      tableSelectionChange(selection) {
        this.tableSelection = selection;
      },
      //切换页数
      pageChange(curPage) {
        this.curPage = curPage;
        this.getData();
      },
      //切换页数显示个数
      pageChangeSize(pageSize) {
        this.pageSize = pageSize;
        this.getData();
      },
      //打开表单弹窗（id是这条数据的id）
      formOpenModal(id) {
        this.formShow = true;
        if (id) {
          this.getFormData(id);
        }
      },
      //关闭表单弹窗
      formCloseModal() {
        this.$refs['form'].resetFields();
        if (this.formModel.id) {
          delete this.formModel.id
        };
        this.formShow = false;
        this.formSubmitLoading = false;
        //上传组件清空
        this.$refs["commonUpload"] && this.$refs["commonUpload"].clearFiles();
        this.formCloseModalAfter && this.formCloseModalAfter();
      },
      //日期空间变化时触发
      datePickerChange(dateRange) {
        this.searchFields["startTime"] = dateRange[0];
        this.searchFields["endTime"] = dateRange[1];
        this.getData();
      },
      //搜索数据
      searchData() {
        debugger
        this.curPage = 1;
        this.searchLoading = true;
        this.getData();
      },
      //处理树的数据
      handleTreeData(list, fields) {
        list.forEach((t, i) => {
          if (fields) {
            for (let attr in fields) {
              t[attr] = t[fields[attr]]
            }
          }
          t.expand = false;
          // t.label = t.name;
          // t.label = t.departName;
          // t.title = t.departName;
          // t.label = t.displayName;
          // t.id = t.name;


          if (t.children && t.children.length > 0) {
            this.handleTreeData(t.children, fields);
          } else {
            t.children = '';
          }
        })
      }

      //图片字段base64的处理
      // formChangeFile(e, key) {
      //   Lrz(e.target.files[0], {
      //     width: 300,
      //     height: 300,
      //     quality: 1
      //   }).then((res) => {
      //     this.formModel[key] = res.base64;
      //     e.target.setAttribute('type', 'text') //处理第二次change失效
      //     e.target.setAttribute('type', 'file')
      //   })
      // },
    }
  }
}
