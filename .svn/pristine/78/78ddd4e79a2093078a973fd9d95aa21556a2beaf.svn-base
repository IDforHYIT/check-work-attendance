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
        <!-- <Input v-model="searchFields.userName"
          placeholder="请输入角色名称"/>
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
        >
        <Spin fix
          v-if='formLoading'></Spin>
        <Form ref='form'
          :label-width="90"
          :model="formModel"
          :rules="formRule">
          <FormItem label="班次："
            prop="banciName">
            <Input v-model="formModel.banciName"
              placeholder="请输入班次"/>
          </FormItem>
          <FormItem label="起用日期："
            prop="startDate">
              <DatePicker type="date" placeholder="Select date" v-model="formModel.startDate" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="结束日期："
            prop="endDate">
              <DatePicker type="date" placeholder="Select date" v-model="formModel.endDate" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="排班类型："
            prop="paiBanType">
            <Select v-model="formModel.paiBanType" style="width:100px">
              <Option v-for="item in cycleUnit" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>          
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import { getRoleList } from "@/api/data";
var bb = {
  0: "公司",
  1: "部门",
  2: "个人"
};
export default {
  name: "users",
  mixins: [mixins.commonPage],
  components: {},
  data() {
    return {
      url: "/PaiBan",
      searchFields: {
        // userName: ""
      },
      cycleUnit: [
        {
          value: 0,
          label: "公司"
        },
        {
          value: 1,
          label: "部门"
        },
        {
          value: 2,
          label: "个人"
        }
      ],
      paiBanType: [],
      tableFields: [
        {
          title: "班次",
          key: "banciName",
          align: "left"
        },
        {
          title: "开始日期",
          key: "startDate",
          align: "left"
        },
        {
          title: "结束日期",
          key: "endDate",
          align: "left"
        },
        {
          title: "排班类型",
          key: "paiBanType",
          align: "left",
          render: (h, params) => {
            return h("span", bb[params.row.paiBanType]);
          }
        }
      ],
      formModel: {
        banciName: "",
        startDate: "",
        endDate: "",
        paiBanType: ""
      },
      formRule: {}
    };
  },
  computed: {},
  methods: {},
  mounted() {
    console.log(this.$store);
  }
};
</script>
<style lang="less" scoped>
</style>
