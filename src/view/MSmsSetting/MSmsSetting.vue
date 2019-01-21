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

        <Button type="warning"
                size="small"
                icon="md-sync"
                @click="getFormData()">刷新</Button>
        </Col>
      </Row>

      <Row>
        <Col span="6"
             class='title'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="90"
              :model="formModel"
              :rules="formRule">
          <FormItem label="短信秘钥："
                    prop="appKey">
            <Input v-model="formModel.appKey"
                   placeholder="请输入短信秘钥" />
          </FormItem>
          <FormItem label="短信模板："
                    prop="templateId">
            <Input v-model="formModel.templateId"
                   placeholder="请输入短信模板" />
          </FormItem>
          <FormItem label="是否启用："
                    prop="isStatus">
            <i-switch v-model="formModel.isStatus" />
          </FormItem>
          <FormItem style='display:block'>
            <Button type="primary"
                    :loading="formSubmitLoading"
                    @click="submitData">设置</Button>
          </FormItem>
        </Form>
        </Col>

      </Row>

    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import axios from '@/libs/api.request'
export default {
  name: 'MSmsSetting',
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/MSmsSetting",
      noMounted: true, //不自动获取表格数据
      formModel: {
        appKey: "",
        templateId: '',
        isStatus: false
      },
      formRule: {

      }
    };
  },
  computed: {},
  methods: {

    //更新
    updateData () {
      axios.request({
        url: `${this.url}/put`,
        method: 'put',
        data: this.formModel
      }).then((res) => {
        this.$Message.success('设置成功');
        this.getFormData();
      }).catch((res) => {
        this.formSubmitLoading = false;
      })
    },
  },
  mounted () {
    this.getFormData();
  }
};
</script>
<style lang="less" scoped>
</style>
