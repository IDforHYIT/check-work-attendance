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
             width='550'
             v-model="formShow"
             :loading='modalButtonShowLoading'
             @on-ok='submitData'
             @on-cancel='formCloseModal'
             :title='$route.meta.title+"详情"'>
        <Spin fix
              v-if='formLoading'></Spin>
        <Form ref='form'
              :label-width="120"
              :model="formModel"
              :rules="formRule">
          <FormItem label="假期名称："
                    prop="holidayName">
            <Input v-model="formModel.holidayName"
                   placeholder="请输入假期名称" />
          </FormItem>
          <FormItem label="请假单位："
                    prop="timeType">
            <Select placeholder='请选择请假单位'
                    v-model="formModel.timeType">
              <Option v-for='(t,i) in timeTypeList'
                      :key='i'
                      :value="t.value">{{t.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="计算请假时长方式："
                    prop="name">
            <Select placeholder='请选择计算请假时长方式'
                    v-model="formModel.timeLengthMethod">
              <Option v-for='(t,i) in timeLengthMethodList'
                      :key='i'
                      :value="t.value">{{t.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="启用假期余额："
                    prop="isBalance">
            <i-switch v-model="formModel.isBalance" />
          </FormItem>
          <div v-show='formModel.isBalance'>
            <FormItem label="余额发放方式："
                      prop="balanceType">
              <Select placeholder='请选择余额发放方式'
                      @on-change='balanceTypeChange'
                      v-model="formModel.balanceType ">
                <Option v-for='(t,i) in balanceTypeList'
                        :key='i'
                        :label="t.label"
                        :value="t.value">
                  <span> {{t.label}}</span>

                  <span style="display: block;color:#ccc">
                    <Icon type="ios-information-circle-outline" /> {{t.subLabel}}</span>
                </Option>
              </Select>
              <Card v-show='formModel.balanceType==1'
                    style="margin-top:5px">
                <ul style='list-style: none;'>
                  <li style='margin-bottom: 5px;font-size: 12px;'
                      v-for='(t,i) in formModel.rules'
                      :key='i'>入职 {{t.expressionLimitText}}{{t.limitYear}}年，享有
                    <InputNumber style='width:50px'
                                 v-model="t.days"></InputNumber>
                    天年假</li>
                </ul>
              </Card>
            </FormItem>
            <FormItem v-show='formModel.balanceType==3'
                      label="发放规则：">
              加班时长将自动计入调休余额。已设置加班时长计算规则
              <Button type="dashed"
                      size="small">查看</Button>
            </FormItem>
            <FormItem label="有效期规则："
                      prop="effectiveRule">
              <Select placeholder='请选择有效期规则'
                      style='margin-bottom:10px;'
                      v-model="formModel.effectiveRule ">
                <Option v-if='formModel.balanceType!=3'
                        v-for='(t,i) in effectiveRuleList1'
                        :key='i'
                        :value="t.value">{{t.label}}</Option>
                <Option v-if='formModel.balanceType==3'
                        v-for='(t,i) in effectiveRuleList2'
                        :key='i'
                        :value="t.value">{{t.label}}</Option>
              </Select>
              <div v-show='formModel.effectiveRule==2'>每年
                <DatePicker class='fixedDate'
                            disabled
                            ref='fixedDate'
                            v-model='formModel.fixedDate'
                            style='width:100px;'
                            type="date"
                            @on-change='dateChange'
                            placeholder="选择时间"></DatePicker>
                后作废
              </div>
              <div v-show='formModel.effectiveRule==3'>
                <InputNumber style='width:50px'
                             v-model="formModel.fixedDays"></InputNumber>
                天后作废
              </div>
              <Checkbox v-model="formModel.isLateEffective">允许延长有效期</Checkbox>
              <div v-show='formModel.isLateEffective'>
                超过有效期
                <InputNumber style='width:50px'
                             v-model="formModel.lateEffectiveDays"></InputNumber>

                天内继续使用
              </div>
            </FormItem>
          </div>

        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import moment from "moment";
export default {
  name: 'holiday',
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      timeTypeList: [{
        label: '按天请假',
        value: 0,
      }, {
        label: '按半天请假',
        value: 1,
      }, {
        label: '按小时请假',
        value: 2,
      }],
      timeLengthMethodList: [{
        label: '按自然日计算请假时长',
        value: 0,
      }, {
        label: '按工作日计算请假时长',
        value: 1,
      },],
      balanceTypeList: [{
        subLabel: '可批量导入全员的年假，员工请假自动扣减',
        label: '手动发放',
        value: 0,
      }, {
        subLabel: '适用于年假余额',
        label: '按入职时间自动发放',
        value: 1,
      }, {
        subLabel: '自动给全公司员工发放固定天数余额',
        label: '每年自动发放固定天数',
        value: 2,
      }, {
        subLabel: '适用于调休余额，且只能用在一个假期上',
        label: '加班时长自动计入余额',
        value: 3,
      },],
      effectiveRuleList1: [{
        label: '按自然年（1月1日-12月31日）',
        value: 0,
      }, {
        label: '按入职日期起12个月',
        value: 1,
      }],
      effectiveRuleList2: [{
        label: '每年固定时间作废',
        value: 2,
      }, {
        label: '加班多少天后作废',
        value: 3,
      }],
      url: "/HolidayManagement",
      searchFields: {},
      tableFields: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "假期名称",
          key: "holidayName",
          align: "center"
        },
        {
          title: "请假单位",
          key: "timeTypeEnumText",
          align: "center"
        },
        {
          title: "计算请假时长方式",
          key: "timeLengthMethodText",
          align: "center"
        },
        {
          title: "余额规则",
          key: "balanceTypeText",
          align: "center"
        },
      ],
      formModel: {
        holidayName: "",
        timeType: 0,
        timeLengthMethod: 0,
        isBalance: false,
        balanceType: 0,
        effectiveRule: 0,
        isLateEffective: false,
        lateEffectiveDays: 99,
        fixedDays: 0,
        fixedDate: '',
        rules: [{
          expressionLimit: 1,
          expressionLimitText: '<=',
          limitYear: 1,
          days: 5
        }, {
          expressionLimit: 0,
          expressionLimitText: '>=',
          limitYear: 2,
          days: 6
        }, {
          expressionLimit: 0,
          expressionLimitText: '>=',
          limitYear: 3,
          days: 7
        }, {
          expressionLimit: 0,
          expressionLimitText: '>=',
          limitYear: 4,
          days: 8
        }, {
          expressionLimit: 0,
          expressionLimitText: '>=',
          limitYear: 5,
          days: 9
        },
        {
          expressionLimit: 0,
          expressionLimitText: '>=',
          limitYear: 6,
          days: 10
        }]
      },
      formRule: {
        holidayName: { required: true, message: '假期名称不能为空', trigger: 'change' },

      },
      formModelCopy: {},
    };
  },
  computed: {

  },
  methods: {

    dateChange (date) {
      this.formModel.fixedDate = date;
      document.querySelector('.ivu-date-picker-rel input').value = moment(date).format("MM-DD")

    },
    //余额发放方式切换的时候，处理有效期规则的默认选中状态
    balanceTypeChange (value) {
      if (value == 3) {
        this.formModel.effectiveRule = 2
      } else {
        this.formModel.effectiveRule = 0
      }
    },

    getFormDataAfter () {
      this.$nextTick(() => {
        document.querySelector('.ivu-date-picker-rel input').value = moment(this.formModel.fixedDate).format("MM-DD")
      })
    },
    formCloseModalAfter () {
      //手动清空表单，恢复到原来设置
      this.formModel = JSON.parse(JSON.stringify(this.formModelCopy))
    }

  },
  mounted () {
    this.formModelCopy = JSON.parse(JSON.stringify(this.formModel))

  }
}
</script>
<style lang="less" >
.fixedDate {
  input {
    background: #fff !important;
  }
  .ivu-input[disabled] {
    cursor: pointer;
    color: #737373;
  }
}
</style>
