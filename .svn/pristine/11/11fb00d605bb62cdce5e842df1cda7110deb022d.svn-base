<template>
  <div class="product">
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
        <!-- <Button type="info"
                size="small"
                icon="md-add"
                @click="formOpenModal()">添加</Button> -->
        <Poptip confirm
                transfer
                title="是否清空所有打卡记录"
                @on-ok="deleteDataAll()">
          <Button size='small'
                  icon="ios-trash"
                  style='margin-right:10px;'
                  type='error'>清空打卡记录</Button>
        </Poptip>
        <Button type="warning"
                size="small"
                icon="md-sync"
                @click="getData()">刷新</Button>
        </Col>
      </Row>
      <Row class="common-search-box"
           @keydown.enter.native="searchData">
        <Col span="24">
        <Select @on-change='searchData'
                placeholder='请选择签到类型'
                style='width:150px;'
                clearable
                v-model="searchFields.signRemark">
          <Option v-for='(t,i) in signRemarkList'
                  :key='i'
                  :value="t.value">{{t.label}}</Option>
        </Select>
        <Select @on-change='searchData'
                placeholder='请选择签到说明'
                style='width:150px;'
                clearable
                v-model="searchFields.signResult">
          <Option v-for='(t,i) in signResultList'
                  :key='i'
                  :value="t.value">{{t.label}}</Option>
        </Select>
        <treeselect style='width:200px;display: inline-block;
                      vertical-align: -14px;
                      margin-right: 10px;'
                    placeholder='请选择部门名称'
                    noResultsText='没有数据'
                    :show-count="true"
                    v-model="searchFields.departInfoId"
                    :options="departInfoList" />

        <Input v-model="searchFields.userFullName"
               placeholder="请选择用户" />
        <DatePicker @on-change='searchData'
                    v-model='searchDaterange'
                    type="daterange"
                    split-panels
                    placeholder="选择时间段"></DatePicker>
        <Button type="primary"
                icon="search"
                :loading="searchLoading"
                @click='searchData'>搜索</Button>
        </Col>
      </Row>
      <Table :loading="tableLoading"
             :columns="tableFields"
             :data="tableList"></Table>
      <Page class='common-page-box'
            v-if='tableList.length>0'
            show-elevator
            :page-size="pageSize"
            :total="total"
            :current="curPage"
            @on-change="pageChange"
            @on-page-size-change='pageChangeSize'></Page>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import moment from "moment";
import { getDepartInfoList, getUserList, getBanciList, deleteDaKaList } from "@/api/data";
import { getUserGuid } from '@/libs/util'
export default {
  name: 'daka',
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/SignTemp",
      searchDaterange: [], //搜索时间段value
      departInfoList: [],//部门列表   
      userList: [],//部门列表 
      signTypeList: [{
        value: 0,
        label: '无'
      }, {
        value: 1,
        label: '考勤机'
      }, {
        value: 2,
        label: '钉钉'
      }, {
        value: 3,
        label: '微信'
      }],//打卡方式列表 
      signRemarkList: [{
        value: 0,
        label: '无'
      }, {
        value: 1,
        label: '签到'
      }, {
        value: 2,
        label: '签退'
      }, {
        value: 3,
        label: '待选择'
      }, {
        value: 4,
        label: '休息'
      }],//签到类型列表 
      signResultList: [{
        value: 0,
        label: '未处理'
      }, {
        value: 1,
        label: '正常'
      }, {
        value: 2,
        label: '迟到'
      }, {
        value: 3,
        label: '早退'
      }, {
        value: 4,
        label: '无效'
      }],//签到说明列表 
      searchFields: {
        departInfoId: null,
        userGuid: '',
        startSignDate: '',
        endSignDate: '',
        signResult: '',
        signRemark: '',
      },
      tableFields: [
        {
          title: "部门名称",
          key: "departName",
          align: "center",
        },
        {
          title: "员工姓名",
          key: "userFullName",
          align: "center",
        },
        {
          title: "打卡方式",
          key: "signType",
          align: "center",
          render: (h, params) => {
            // let text = this.signTypeList.find((t) => {
            //   return t.value == params.row.signType
            // }).label 
            return h("span", params.row.signTypeText);
          }
        },
        {
          title: "签到说明",
          align: "center",
          render: (h, params) => {
            var option = {
              0: 'default',
              1: 'success',
              2: 'warning',
              3: 'error',
              4: 'gold',
              5: 'magenta',
            }
            return h("div", [
              h(
                "span",
                params.row.signRemarkText
              ),
              h(
                "Tag", {
                  style: {
                    marginLeft: '10px'
                  },
                  props: {
                    color: option[params.row.signResult]
                  }
                }, params.row.signResultText)
            ]);
          },
        },
        {
          title: "签到时间",
          key: "signTime",
          align: "center",
          render: (h, params) => {
            return h("span", moment(params.row.signTime).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        // {
        //   title: "签到说明",
        //   key: "signResultText",
        //   align: "center",
        // },

        // {
        //   title: "排班时间段",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("span", `${params.row.startDate} - ${params.row.endDate}`);
        //   }
        // },
      ],
      formModel: {
      },
      formRule: {

      }
    };
  },
  watch: {
    'searchFields.departInfoId' () {
      this.searchData();
    },
    'searchDaterange' (dateRangeArr) {
      if (dateRangeArr[0] != '') {
        this.searchFields['startSignDate'] = moment(dateRangeArr[0]).format("YYYY-MM-DD")
        this.searchFields['endSignDate'] = moment(dateRangeArr[1]).format("YYYY-MM-DD")
      } else {
        this.searchFields['startSignDate'] = ''
        this.searchFields['endSignDate'] = ''
      }
    }
  },
  computed: {
  },
  methods: {
    //展会做临时清空打卡记录用
    deleteDataAll () {
      deleteDaKaList().then(() => {
        this.getData();
      })

    },
    //处理部门tree数据格式
    handleDepartInfoList (list) {
      list.forEach((t, i) => {
        t.label = t.departName;
        if (t.children && t.children.length > 0) {
          this.handleDepartInfoList(t.children);
        } else {
          t.children = '';
        }
      })
    },
    //获取部门列表
    getDepartInfoList () {
      getDepartInfoList().then((res) => {
        this.handleDepartInfoList(res.data)
        this.departInfoList = res.data;
      })
    },
    //获取用户列表
    getUserList () {
      getUserList().then((res) => {
        this.userList = res.data;
      })
    },
  },
  mounted () {
    this.getDepartInfoList();
    this.getUserList();
  }
};
</script>
<style lang="less" scoped>
</style>
