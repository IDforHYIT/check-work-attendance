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
        <treeselect style='width:200px;'
                    placeholder='请输入内容'
                    noResultsText='没有数据'
                    v-model="formModel.id"
                    :options="tableList" />

        </Col>
      </Row>
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
      url: '/role',
      formModel: {
        id: 'dff46813-2e13-4a97-80d2-6234dad7a64d',
      },
    };
  },
  computed: {},
  methods: {
    getData () {
      var res = { "result": true, "message": "操作成功", "curPage": "1", "pageSize": "20", "data": [{ "parentId": "89970a09-e60d-418a-944d-4186d22c5d88", "departName": "考勤系统", "code": "00001.00001.00001.00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:29:52", "creatorUserId": 2, "id": "b7e387e0-c88b-44f7-a3cf-f870117d8950" }, { "parentId": "61640b08-4b29-4044-a4f5-78dae36f7f58", "departName": "研发一部", "code": "00001.00001.00002", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:29:35", "creatorUserId": 2, "id": "dff46813-2e13-4a97-80d2-6234dad7a64d" }, { "parentId": "61640b08-4b29-4044-a4f5-78dae36f7f58", "departName": "研发三部", "code": "00001.00001.00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:29:24", "creatorUserId": 2, "id": "89970a09-e60d-418a-944d-4186d22c5d88" }, { "parentId": "cb221099-ca1b-4512-baca-33de1e2c3d37", "departName": "研发部1", "code": "00001.00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": "2018-09-19T16:33:07", "lastModifierUserId": 2, "creationTime": "2018-09-11T17:29:09", "creatorUserId": 2, "id": "61640b08-4b29-4044-a4f5-78dae36f7f58" }, { "parentId": null, "departName": "温州旭辉科技", "code": "00001", "isDeleted": false, "deleterUserId": null, "deletionTime": null, "lastModificationTime": null, "lastModifierUserId": null, "creationTime": "2018-09-11T17:28:28", "creatorUserId": 2, "id": "cb221099-ca1b-4512-baca-33de1e2c3d37" }], "total": 5 }
        ;
      this.tableList = res.data.map((t, i) => {
        return {
          id: t.id,
          label: t.departName
        }
      })
    }
  },
  mounted () {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
</style>
