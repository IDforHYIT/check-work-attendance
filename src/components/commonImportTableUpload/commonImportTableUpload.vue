<template>

  <div style='display:inline'>
    <Upload class='common-importTableData-button'
            ref="upload"
            :headers='headers'
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['xlsx']"
            :max-size="1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :on-progress="handleOnProgress"
            :on-error='handleOnError'
            handleOnProgress
            :action='url'>
      <Button type="primary"
              icon="ios-cloud-upload-outline">导入数据</Button>
    </Upload>

    <Modal width='1300'
           ref='formModal'
           v-model="formShow"
           :loading='modalButtonShowLoading'
           @on-ok='submitData'
           @on-cancel='formCloseModal'
           title='导入数据验证'>
      <Spin fix
            v-if='formLoading'></Spin>
      <Table :row-class-name="rowClassName"
             ref='table'
             :loading="tableLoading"
             :columns="tableFields"
             :data="tableList"></Table>
    </Modal>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
import config from "@/config";
import { getToken } from "@/libs/util";
export default {
  data () {
    return {
      tableFields: [{
        title: "姓名",
        key: "姓名",
        align: "center"
      },
      {
        title: "手机号码",
        key: "手机号码",
        align: "center"
      },
      {
        title: "公司名称",
        key: "公司名称",
        align: "center"
      },
      {
        title: "职位",
        key: "职位",
        align: "center"
      },
      {
        title: "邮箱",
        key: "邮箱",
        align: "center"
      },
      {
        title: "地址",
        key: "地址",
        align: "center"
      },
      {
        title: "备注",
        key: "备注",
        align: "center"
      },
      {
        title: "负责人",
        key: "负责人",
        align: "center"
      },
      {
        title: "共享人",
        key: "共享人",
        align: "center"
      },
      {
        title: "级别",
        key: "级别",
        align: "center",
        render: (h, params) => {
          return h("span", params.row['标签组'][0]);
        }
      },
      {
        title: "类型",
        key: "类型",
        align: "center",
        render: (h, params) => {
          return h("span", params.row['标签组'][1]);
        }
      },
      {
        title: "错误说明",
        key: "错误说明",
        align: "center",
        render: (h, params) => {
          return h("span", params.row['错误说明'][0]);
        }
      },

      ],
      tableLoading: false,
      tableList: [],
      formLoading: false,
      modalButtonShowLoading: false,
      formShow: false,
      headers: {
        Authorization: `Bearer ${getToken()}`
      },

    };
  },

  computed: {
    url () {
      let url =
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev
          : config.baseUrl.pro;
      return `${url}${this.action}`;
    },
    validate () {
      let result = true;
      this.tableList.forEach((t) => {
        if (!t.isSuccess) {
          result = false;
          return false;
        }
      })
      return result;
    },
  },
  props: ["action", 'actionSubmit'],
  methods: {
    rowClassName (row, index) {
      if (row.isSuccess) {
        return '';
      } else {
        return 'demo-table-error-row';
      }
      return '';
    },
    //新增数据
    createData () {
      axios.request({
        url: `${this.actionSubmit}`,
        method: 'post',
        data: this.tableList
      }).then((res) => {
        this.$Message.success('导入成功');
        this.formCloseModal();
        this.$emit("on-success", res);
      }).catch((res) => {
        this.formSubmitLoading = false;
        this.modalButtonShowLoadingReset();
      })
    },
    //提交数据（新增/修改数据触发按钮）
    submitData () {
      if (this.validate) {
        this.formSubmitLoading = true;
        this.createData();
      } else {
        //处理点击确定按钮时验证不通过 loading一直显示的问题
        this.modalButtonShowLoadingReset();
        this.$Message.error('验证失败！');
      }
    },
    formCloseModal () {

    },
    //重置弹窗底部按钮loading(处理点击确定按钮时验证不通过 loading一直显示的问题)
    modalButtonShowLoadingReset () {
      this.modalButtonShowLoading = false;
      this.$nextTick(() => {
        this.modalButtonShowLoading = true;
      })
    },
    handleSuccess (res, file) {
      if (res.result) {
        this.tableList = res.data;
        this.formLoading = false;

      } else {
        this.$Message.error(res.message);
      }


      //   file.url = `${res.data.url}`;
      //   file.name = res.data.id;
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: `文件[${file.name}]格式不正确, 请选择xlsx`,

      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: "文件  " + file.name + " 太大了，不要超过2mb"
      });
    },
    handleOnError (res) {
      this.$Message.error('图片上传失败');
    },
    handleBeforeUpload () {
      // const check = this.uploadList.length < 5;
      // if (!check) {
      //   this.$Notice.warning({
      //     title: "Up to five pictures can be uploaded."
      //   });
      // }
      // return check;
    },
    handleOnProgress () {
      this.formShow = true;
      this.formLoading = true;
      //   this.uploadList = [];
    }
  },
  mounted () {

  }
};
</script>
<style >
.ivu-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-error-row td {
  background-color: #ed4014;
  color: #fff;
}
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
