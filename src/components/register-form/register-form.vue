<template>
  <Form ref="form"
        :model="formModel"
        :rules="formRule"
        @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="formModel.userName"
             placeholder="请输入手机号">
      <span slot="prepend">
        <Icon :size="16"
              type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password"
             v-model="formModel.password"
             placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14"
              type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="realName">
      <Input v-model="formModel.realName"
             placeholder="真实姓名">
      <span slot="prepend">
        <Icon :size="14"
              type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="role">
      <Select v-model="formModel.role"
              style="width:200px">
        <Option v-for="t in roleList"
                :value="t.id"
                :key="t.id">{{ t.name }}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit"
              type="primary"
              long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
import { getRoleList } from "@/api/data";
export default {
  name: "RegisterForm",
  data () {
    return {
      roleList: [],
      formModel: {
        userName: "",
        password: "",
        realName: "",
        role: ""
      },
      formRule: {
        userName: [
          { required: true, message: "账号不能为空", }
        ],
        userName: [
          { required: true, message: "密码不能为空", }
        ],
        userName: [
          { required: true, message: "真实姓名不能为空", }
        ],
        // role: [{ required: true, message: "角色不能为空",  }]
      }
    };
  },
  methods: {
    //获取用户角色
    getRoleList () {
      getRoleList().then(res => {
        this.roleList = res.data;
      });
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", this.formModel);
        }
      });
    }
  },
  mounted () {
    this.getRoleList();
  }
};
</script>
