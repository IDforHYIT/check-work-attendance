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
          <FormItem label="加班规则名称："
                    prop="name">
            <Input v-model="formModel.name"
                   style='width:200px;'
                   placeholder="请输入加班规则名称" />
          </FormItem>

          <FormItem label="加班规则对象："
                    prop="selectMainGuids">
            <treeselect placeholder='请选择部门员工'
                        noResultsText='没有数据'
                        multiple
                        :show-count="true"
                        v-model="formModel.selectMainGuids"
                        valueFormat='object'
                        :options="treeDataList">
              <label slot="option-label"
                     slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }"
                     :class="labelClassName">
                <Icon :type="node.raw.mainGuidType==1?'md-git-merge':'md-person'" />
                {{ node.label }}
                <span v-if="shouldShowCount"
                      :class="countClassName">({{ count }})</span>
              </label>
            </treeselect>
          </FormItem>
          <Divider orientation="left">工作日加班</Divider>
          <FormItem label="允许加班："
                    prop="isAllowWorkOver">
            <i-switch v-model="formModel.isAllowWorkOver" />
          </FormItem>
          <div v-show='formModel.isAllowWorkOver'>
            <FormItem label="加班方式计算："
                      prop="timeType">
              <RadioGroup v-model="formModel.workOverMethod"
                          vertical>
                <Radio v-for='(t,i) in workOverMethodList'
                       :key='i'
                       :label="t.value">
                  <span>{{t.label}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="加班补偿："
                      prop="isDayOff">
              <Checkbox v-model="formModel.isDayOff">转为调休余额</Checkbox>
            </FormItem>
          </div>

          <Divider orientation="left">休息日和节假日加班 </Divider>
          <FormItem label="允许加班："
                    prop="isAllowWorkOver">
            <i-switch v-model="formModel.isAllowWorkOverLayDay" />
          </FormItem>
          <div v-show='formModel.isAllowWorkOverLayDay'>
            <FormItem label="加班方式计算："
                      prop="timeType">
              <RadioGroup v-model="formModel.workOverLayDayMethod"
                          vertical>
                <Radio v-for='(t,i) in workOverMethodList'
                       :key='i'
                       :label="t.value">
                  <span>{{t.label}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="加班补偿："
                      prop="isDayOff">
              <Checkbox v-model="formModel.isDayOffLayDay">转为调休余额</Checkbox>
            </FormItem>
          </div>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
import mixins from "@/libs/mixins.js";
import { generateOptions } from "@/libs/util.js";
import { getDepartmentAndStaff } from "@/api/data";

import moment from "moment";
export default {
  name: 'overtimeRule',
  mixins: [mixins.commonPage],
  components: {},
  data () {
    return {
      url: "/WorkOverTimeRules",
      searchFields: {},
      tableFields: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "加班规则名称",
          key: "name",
          align: "center"
        },
        {
          title: "加班规则对象",
          key: "selectMainNames",
          align: "center"
        },
        {
          title: "规则内容",
          key: "timeTypeEnumText",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                params.row.workOverMethodText
              ),
              h(
                "p",
                params.row.workOverLayDayMethodText
              ),
            ]);
          }
        },

      ],
      formModel: {
        name: "",
        isAllowWorkOver: true,
        workOverMethod: 0,
        isDayOff: false,
        isAllowWorkOverLayDay: true,
        workOverLayDayMethod: 0,
        isDayOffLayDay: false,
        selectMainGuids: [],


      },
      formRule: {
        holidayName: { required: true, message: '假期名称不能为空', trigger: 'change' },

      },
      workOverMethodList: [{
        label: '需审批，以审批单为准',
        value: 0,
      }, {
        label: '需审批，以打卡为准，但不能超过审批单时长',
        value: 1,
      }, {
        label: '无需审批，根据打卡时间计算加班时长',
        value: 2,
      }],
      treeData: [],
      treeDataList: [],
    };
  },
  computed: {

  },
  methods: {

  },
  mounted () {
    getDepartmentAndStaff().then((res) => {
      this.handleTreeData(res.data, {
        label: 'name',
        id: 'mainGuid',

      })
      this.treeDataList = res.data;
    })

  }
}
</script>
<style lang="less" >
</style>
