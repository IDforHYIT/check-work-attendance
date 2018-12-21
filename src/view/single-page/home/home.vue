<template>
  <div>
    <Row :gutter="20">
      <i-col span="4"
             v-for="(infor, i) in inforCardData"
             :key="`infor-${i}`"
             style="height: 120px;">
        <infor-card shadow
                    :color="infor.color"
                    :icon="infor.icon"
                    :icon-size="36">
          <count-to :end="infor.count"
                    count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20"
         style="margin-top: 20px;">
      <i-col span="8">
        <Card shadow>
          <chart-pie ref='pie'
                     style="height: 300px;"
                     :value="pieData"
                     text="用户各类别考勤比例"></chart-pie>
        </Card>
      </i-col>
      <i-col span="16">
        <Card shadow>
          <chart-bar style="height: 300px;"
                     :value="barData"
                     text="每周用户打卡量" />
        </Card>
      </i-col>
    </Row>
    <Row style="margin-top: 20px;">
      <Card shadow>
        <example style="height: 310px;" />
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar } from "_c/charts";
import Example from "./example.vue";
// import { getinforCardData, getpieData, getbarData } from "@/api/tubiao";
import { duration } from 'moment';
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        // { title: '用户数量', icon: 'md-person', count: 803, color: '#2d8cf0' },
        // { title: '部门数量', icon: 'md-locate', count: 30, color: '#19be6b' },
        // { title: '今日请假', icon: 'md-help-circle', count: 32, color: '#ff9900' },
        // { title: '今日外出', icon: 'ios-exit', count: 50, color: '#9A66E4' },
        // { title: '今日迟到', icon: 'md-link', count: 60, color: '#ed3f14' },
        // { title: '今日旷工', icon: 'md-close', count: 12, color: '#E46CBB' },
      ],
      pieData: [
        // { name: "外出", value: 12 },
        // { name: "请假", value: 32 },
        // { name: "出差", value: 7 },
        // { name: "迟到", value: 14 },
        // { name: "早退", value: 0 }
      ],
      barData: {
        // 周一: 13253,
        // 周二: 34235,
        // 周三: 26321,
        // 周四: 12340,
        // 周五: 24643,
        // 周六: 1322,
        // 周日: 1324
      }
    };
  },
  methods: {
    // getinforCardData() {
    //   getinforCardData().then(res => {
    //     this.inforCardData = res.data.inforCardData;
    //   });
    // },
    // getpieData() {
    //   getpieData().then(res => {
    //      this.pieData = res.data.pieData;
    //   });
    // }
  },
  mounted () {
    // this.getinforCardData();
    // this.getpieData();

  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
