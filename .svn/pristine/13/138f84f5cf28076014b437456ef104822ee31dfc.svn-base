<template>
  <Modal ref='formModal'
         width='300'
         v-model="formShow"
         :loading='modalButtonShowLoading'
         @on-ok='submitData'
         @on-cancel='formCloseModal'
         :title='$route.meta.title+"密码设置"'>
    <Spin fix
          v-if='formLoading'></Spin>
    <Form ref='form'
          :label-width="100"
          :model="formModel"
          :rules="formRule">
      <FormItem label="设备名称："
                prop="displayName">
        <Input v-model="formModel.displayName"
               disabled
               placeholder="请输入设备名称" />
      </FormItem>
      <FormItem label="设备识别码："
                prop="name">
        <Input v-model="formModel.name"
               disabled
               placeholder="请输入识别码" />
      </FormItem>
      <FormItem label="设备密码："
                prop="password">
        <Input type='password'
               v-model="formModel.password"
               placeholder="请输入设备密码" />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import axios from '@/libs/api.request'
import mixins from "@/libs/mixins.js";
export default {
  name: "MDeviceEditPassword",
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      noMounted: true, //不自动获取表格数据
      url: '/MDevice',
      formModel: {
        displayName: '',
        name: "",
        password: '',
      },
      formRule: {
        password: { required: true, message: '设备密码不能为空', trigger: 'change' },
      },


    };
  },
  computed: {},
  methods: {
    //设置设备密码
    updateData () {
      axios.request({
        url: '/MDevice/SetOpenDoorPassword',
        method: 'post',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('设备密码设置成功');
        this.formCloseModal();
        this.$emit('on-success');
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
<style lang="less" scoped></style>