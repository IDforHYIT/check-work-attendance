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

      <Table ref='table'
             @on-selection-change='tableSelectionChange'
             :loading="tableLoading"
             :columns="tableFieldsRender"
             :data="tableList"></Table>
      <Row>
        <Col span="12"
             class='common-footer-action'>
        <Poptip confirm
                title="是否批量删除?"
                @on-ok="deleteAllListData">
          <Button type="error"
                  icon="ios-trash">批量删除</Button>
        </Poptip>
        </Col>
        <Col span="12">
        <Page v-if='tableList.length>0'
              show-elevator
              :page-size="pageSize"
              :total="total"
              :current="curPage"
              @on-change="pageChange"
              @on-page-size-change='pageChangeSize'></Page>
        </Col>
      </Row>
      <Modal ref='formModal'
             width='300'
             v-model="formShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             :title='$route.meta.title+"详情"'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="90"
              :model="formModel"
              :rules="formRule">
          <FormItem label="分组名称："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入分组名称" />
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
export default {
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/ApproveGroup",
      searchFields: {},
      tableFields: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "分组名称",
          key: "name",
          align: "center"
        },
      ],
      formModel: {
        name: ""
      },
      formRule: {
        name: { required: true, message: '分组名称不能为空', trigger: 'change' },

      },
    };
  },
  computed: {},
  methods: {


  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
</style>
