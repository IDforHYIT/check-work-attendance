<template>
  <div>

    <div class="demo-upload-list"
         :key='index'
         v-for="(item,index) in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <!-- <Icon type="ios-eye"
                @click.native="handleView(item.url)"></Icon> -->
          <Icon type="md-create"
                @click.native="handleUpdate(item)"></Icon>

        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress"
                  :percent="item.percentage"
                  hide-info></Progress>
      </template>
    </div>
    <Upload v-show='uploadList.length==0'
            ref="upload"
            :headers='headers'
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :on-progress="handleOnProgress"
            :on-error='handleOnError'
            handleOnProgress
            multiple
            type="drag"
            :action='url'
            style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera"
              size="20"></Icon>
      </div>
    </Upload>
    <Modal title="预览图片"
           v-model="visible">
      <img :src="imgSrc"
           v-if="visible"
           style="width: 100%">
      <div slot='footer'></div>
    </Modal>
  </div>
</template>
<script>
import config from "@/config";
import { getToken } from "@/libs/util";
export default {
  data () {
    return {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      defaultList: [],
      imgSrc: "",
      visible: false,
      uploadList: []
    };
  },

  computed: {
    url () {
      let url =
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev
          : config.baseUrl.pro;
      return `${url}${this.action}`;
    }
  },
  props: ["action"],
  methods: {
    //设置默认图片
    setUploadDefaultList (imgSrc) {
      if (imgSrc) {
        let name = imgSrc
          .split("/")
        [imgSrc.split("/").length - 1].split(".")[0];
        this.defaultList = [];
        this.defaultList.push({ name: name, url: imgSrc, id: name });
        this.$nextTick(() => {
          this.uploadList = this.$refs.upload.fileList;
        });
      }
    },
    clearFiles () {
      this.defaultList = [];
      this.uploadList = [];
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList;
      });
    },
    handleView (src) {
      this.imgSrc = src;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    //更新图片
    handleUpdate () {
      this.$refs.upload.$el.querySelector(".ivu-upload-input").click();
    },
    handleSuccess (res, file) {
      this.setUploadDefaultList(res.data.headerImgUrl);
      this.$emit("on-success", res.data.headerImgUrl,res.data.headerImg);
      //   file.url = `${res.data.url}`;
      //   file.name = res.data.id;
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: "文件  " + file.name + " 太大了，不要超过2mb"
      });
    },
    handleOnError (res) {
      this.$Message.error('图片上传失败');
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    handleOnProgress () {
      //   this.uploadList = [];
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
    this.uploadLists = this.$refs.upload.fileLists;
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
