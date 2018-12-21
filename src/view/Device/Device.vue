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
        <Input v-model="searchFields.name"
          placeholder="请输入识别码"/>
        <Button type="primary"
          icon="search"
          :loading="searchLoading"
          @click='searchData'>搜索</Button>
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
             width='550'
             v-model="formShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             :title='$route.meta.title+"详情"'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="130"
              :model="formModel"
              :rules="formRule">
          
          <FormItem label="设备识别码："
                    prop="name">
            <Input v-model="formModel.name"
                   placeholder="请输入识别码" />
          </FormItem>
          <FormItem label="设备名称："
                    prop="displayName">
            <Input v-model="formModel.displayName"
                   placeholder="请输入设备名称" />
          </FormItem>
          <FormItem label="设备描述："
                    prop="description">
            <Input v-model="formModel.description"
                   placeholder="请输入设备描述" />
          </FormItem>
          <FormItem label="授权开门人员："
                    prop="userGuids">
            <Select placeholder='请选择用户'
                    style='width:200px;'
                    multiple
                    v-model="formModel.userGuids">
              <Option v-for='(t,i) in userList'
                      :key='i'
                      :value="t.userGuid">{{t.fullName}}</Option>
            </Select>
            
          </FormItem>
          <FormItem label="设备类型：" prop="deviceType">
                <Select v-model="formModel.deviceType"
                        style="width:200px;">
                  <Option :value="1">考勤机</Option>
                  <Option :value="2">门禁机</Option>
                </Select>
              </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import moment from "moment";
import { getUserList } from "@/api/data";
var device = {
  1: "考勤机",
  2: "门禁机",
};
export default {
  name: "MDevice",
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/MDevice",
      searchFields: {
        
      },
      userList: [],//部门列表  
      tableFields: [
      {
          title: "设备识别码",
          key: "name",
          align: "center",
          
        },
        {
          title: "设备名称",
          key: "displayName",
          align: "center",
          
        },
        // {
        //   title: "设备类型",
        //   key: "deviceType",
        //   align: "center",
          
        // },
        {
          title: "设备描述",
          key: "description",
          align: "center",
          
        },
        // {
        //   title: "门禁设备",
        //   key: "deviceIpAddress",
        //   align: "center",
          
        // }, 
        {
          title: "授权开门人员",
          key: "userInfos",
          align: "center",
          render: (h, params) => {
            let str= params.row.userInfos.map((t)=>{
              return t.fullName
            }).join(',')
            return h("span", str)
          }
        },
        {
          title: "设备类型",
          key: "deviceType",
          align: "center",
          render: (h, params) => {
            return h("span", device[params.row.deviceType]);
          }
        },
      ],


      formModel: {
        name:"",
        displayName: "",
        description: "",
        deviceTypeText: "",
        userGuid: "",
        deviceType: "",
      },
      formRule: {
        name:"",
        displayName: "",
        description: "",
        deviceTypeText: "",
        userGuid: "",
        deviceType: "",

      }
    };
  },
  computed: {},
  methods: {
    
    getUserList () {
      getUserList({
        pageSize: 0,
        curPage:1,
      }).then((res) => {
        this.userList = res.data;
      })
    },
  },
  mounted () {
    this.getUserList();
  }
};
</script>
<style lang="less" scoped></style>