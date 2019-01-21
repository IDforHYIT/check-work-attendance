<template>
  <Modal ref='formModal'
         v-model="formShow"
         :loading='modalButtonShowLoading'
         @on-ok='submitData'
         @on-cancel='formCloseModal'
         :title='$route.meta.title+"菜单"'
         width='500'>
    <Spin fix
          v-if='formLoading'></Spin>
    <Form ref='form'
          :label-width="0"
          :model="formModel"
          :rules="formRule">

      <FormItem prop="permissions">
        <Table border
               @on-selection-change='tableSelect'
               ref="selection"
               :columns="tableMenuFields"
               :data="tableMenuList"></Table>
      </FormItem>

    </Form>
  </Modal>
</template>
<script>
import axios from '@/libs/api.request'
import mixins from "@/libs/mixins.js";
import { getNewPermission } from "@/api/data";


export default {
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      noMounted: true,
      url: "/NewRoles",
      searchFields: {
        name: ""
      },

      tableMenuList: [],
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
      formModel: {
        displayName: '',
        name: "",
        description: "",
        isStatic: false,
        permissions: [],
        newRoleGroupId: '',
      },

    };
  },
  watch: {

  },
  computed: {

  },
  methods: {
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
    //关闭表单弹窗
    formCloseModalAfter () {
      //处理表格选择框清空
      for (let attr in this.$refs['selection'].objData) {
        this.$refs['selection'].objData[attr]._isChecked = false;
      }
    },
    updateDataAfter () {
      this.$emit('on-success');
    },
    tableSelect (selection, row) {
      this.formModel.permissions = selection.map((t) => {
        return t.name
      })
    },
  },
  mounted () {
    getNewPermission().then((res) => {
      this.tableMenuList = res.data.children;
    })
  }
};
</script>
<style lang="less" scoped>
</style>
