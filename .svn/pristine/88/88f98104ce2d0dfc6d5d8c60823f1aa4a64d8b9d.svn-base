<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">

    <div class="login-con">
      <Card icon="log-in"
            title="欢迎登录【考勤系统】"
            :bordered="false">
        <div class="form-con">
          <Spin v-if='formLoading'
                fix></Spin>
          <login-form v-if='type==="login"'
                      @on-success-valid="handleSubmit"></login-form>
          <register-form ref='registerForm'
                         v-if='type==="register"'
                         @on-success-valid="handleSubmitRegister"></register-form>
          <!-- <p class="login-tip">
            <a @click='type="login"'>登录</a>|
            <a @click='type="register"'>注册</a>
          </p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import RegisterForm from "_c/register-form";
import { mapActions } from "vuex";
import { register } from "@/api/user";
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      type: "login",
      formLoading: false,
    };
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmitRegister (user) {
      register(user).then(res => {
        this.$Message.success(`注册成功，id：${res.data.id}`);
        this.$refs.registerForm.$refs["form"].resetFields();
        this.type = "login";
      });
    },
    handleSubmit (form) {
      this.formLoading = true;
      this.handleLogin(form).then(res => {
        this.getUserInfo().then(res => {
          this.formLoading = false;
          this.$router.push({
            name: "home"
          });
        })
      }).catch((res) => {
        this.formLoading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
p.login-tip {
  a {
    margin: 0 5px;
  }
}
</style>
