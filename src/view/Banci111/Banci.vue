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
          <FormItem label="班次名称："
            prop="banCiName">
            <Input v-model="formModel.banCiName"
              placeholder="请输入班次名称" style="width: 200px"/>
          </FormItem>
          <FormItem label="周期数：">
            <Row>
                <Col span="3">
                  <FormItem prop="cycleNum">
                    <Input v-model="formModel.cycleNum" placeholder="周期数" style="width: 65px"/>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem  prop="cycleUnit">
                    <Select v-model="formModel.cycleUnit" style="width:80px" placeholder="单位">
                      <Option v-for="item in cycleUnit" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
            </Row>
        </FormItem> 
        <!-- <FormItem label="班次名称："
            prop="banciTimeParts">
            <CheckboxGroup v-model="formModel.banciTimeParts">
        <Checkbox v-for='t in formModel.banciTimeParts' :label="t.banciId">
            <span>{{t.dayNum}}</span>
        </Checkbox>        
    </CheckboxGroup>
          </FormItem> -->

          
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import { getRoleList } from "@/api/data";
var aa = {
  1: "周",
  2: "天",
  3: "月"
};
export default {
  name: "users",
  mixins: [mixins.commonPage],
  components: {},
  data() {
    return {
      url: "/Banci",
      searchFields: {
        // userName: ""
      },
      cycleUnit: [
        {
          value: 1,
          label: "周"
        },
        {
          value: 2,
          label: "天"
        },
        {
          value: 3,
          label: "月"
        },
      ],

      tableFields: [
        {
          title: "班次名称",
          key: "banCiName",
          align: "left"
        },
        {
          title: "启用日期",
          key: "startDate",
          align: "left"
        },
        {
          title: "周期数",
          key: "cycleNum",
          align: "left"
        },
        {
          title: "周期单位",
          key: "cycleUnit",
          align: "left",
          render: (h, params) => {
            return h("span", aa[params.row.cycleUnit]);
          }
        }
      ],
      formModel: {
        banCiName: "",
        startDate: "",
        cycleNum: "",
        cycleUnit: "",
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
