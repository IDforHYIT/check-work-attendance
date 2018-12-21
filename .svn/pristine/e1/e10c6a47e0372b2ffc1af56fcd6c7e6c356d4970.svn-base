<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.common-table-title {
  .title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
  }
  .action {
    text-align: right;
    button {
      margin-right: 5px;
    }
  }
}
.common-search-box {
  margin-bottom: 10px;
  .ivu-input-wrapper,
  .ivu-select {
    width: 150px;
    margin-right: 5px;
  }
  .ivu-date-picker-editor {
    width: 250px;
  }
}
.ivu-modal-footer {
  .ivu-btn-text {
    float: right;
  }
}
.ivu-poptip-footer {
  .ivu-btn-text {
    float: right;
  }
}
.common-file-base64 {
  width: 140px;
  display: block;
  input[type="file"] {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 140px;
    height: 140px;
    &:hover {
      cursor: pointer;
    }
  }
  .ivu-avatar-large {
    width: 140px;
    height: 140px;
    line-height: 140px;
    font-size: 52px !important;
    border-radius: 3px;
    border: 1px solid #dddee1;
  }
}
.common-no-data {
  text-align: center;
  padding-top: 58px;
  min-height: 150px;
  font-size: 16px;
  i {
    font-size: 22px;
  }
}
.common-long-text-hidden {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.common-no-color {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
.common-page-box {
  margin-top: 10px;
  text-align: right;
}
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
  left: 10%;
}
.common-delete-poptip {
  width: 50%;
  .ivu-poptip-rel {
    width: 100%;
    button {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      width: 100% !important;
    }
  }
}

</style>
