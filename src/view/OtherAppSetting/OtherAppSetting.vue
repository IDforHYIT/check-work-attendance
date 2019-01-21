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
              :label-width="100"
              :model="formModel"
              :rules="formRule">
          <FormItem label="应用名称："
                    prop="appName">
            <Input v-model="formModel.appName"
                   placeholder="请输入应用名称" />
          </FormItem>
          <FormItem label="描述："
                    prop="description">
            <Input v-model="formModel.description"
                   placeholder="请输入描述" />
          </FormItem>
          <FormItem label="应用类型名称："
                    prop="appType">
            <Select v-model="formModel.appType"
                    style="width:300px;">
              <Option :value="1">钉钉</Option>
              <Option :value="2">微信</Option>
            </Select>
          </FormItem>
          <FormItem label="钉钉秘钥："
                    prop="authCorpid">
            <Input v-model="formModel.authCorpid"
                   placeholder="请输入钉钉秘钥" />
          </FormItem>
          <FormItem label="微信秘钥："
                    prop="appSecret ">
            <Input v-model="formModel.appSecret "
                   placeholder="请输入微信秘钥" />
          </FormItem>

          <FormItem label="是否启用推送："
                    prop="isEnablePush ">
            <i-switch v-model="formModel.isEnablePush " />
          </FormItem>
          <FormItem style='display:block'>
            <Button type="primary"
                    :loading="formSubmitLoading"
                    @click="updateData">设置</Button>
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
  name: 'OtherAppKey',
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/OtherAppKey",
      noMounted: true, //不自动获取表格数据
      formModel: {
        appName: "",
        description: '',
        appType: '',
        appSecret: '',
        authCorpid: '',
        isEnablePush: '',
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
