<template>
  <div class="login">
    <el-form
      ref="loginForm"
      class="login-form"
      label-position="left"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item
        prop="username"
      >
        <el-input
          v-model="loginForm.username"
          autocomplete="on"
          prefix-icon="el-icon-user-solid"
          placeholder="admin"
          name="username"
          type="text"
          tabindex="1"
          :maxlength="5"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
      >
        <el-input
          v-model="loginForm.password"
          autocomplete="on"
          prefix-icon="el-icon-lock"
          placeholder="888888"
          name="password"
          tabindex="2"
          :type="passwordType"
          ref="password"
          :maxlength="6"
          @keyup.enter.native="handleLogin"
        >
          <i
            class="fa fa-eye"
            :class="passwordType==='password'?'fa-eye':'fa-eye-slash'"
            slot="suffix"
            @click.stop="togglePasswordType"
            style="width: 25px; cursor: pointer;"
          ></i>
        </el-input>
      </el-form-item>
      <el-button
        :loading="loginLoading"
        type="primary"
        style="width: 100%;"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  const validUsername = (str) => {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
  }

  const validateUsername = (rule, value, callback) => {
    if (!validUsername(value)) {
      callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  }

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            { require: true, trigger: 'blur', validator: validateUsername }
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入正确的密码' },
          ]
        },

        loginLoading: false,
        passwordType: 'password',

        redirect: ''
      }
    },
    watch: {
      $route: {
        handler (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      // 切换密码框类型
      togglePasswordType () {
        if (this.passwordType === 'password') {
          this.passwordType = 'text'
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      // 登录
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loginLoading = true
            setTimeout(() => {
              /* const userInfo = {
                name: this.loginForm.username,
                roles: [this.loginForm.username],
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
              } */
              this.loginLoading = false
              this.setLoginStatus(true)
              // this.setUserInfo(userInfo)
              this.setAccessToken(`${this.loginForm.username}Token`)
              this.$router.push({
                path: '/'
              })
            }, 3000)
          } else {
            return false
          }
        })
      },
      ...mapActions(['setLoginStatus', 'setUserInfo', 'setAccessToken'])
    },
  }
</script>

<style scoped lang="scss">
  @import "~element-ui/packages/theme-chalk/src/common/var";

  .login {
    width: 368px;
    height: auto;
    margin: 0 auto;
  }

  @media (max-width: 576px) {
    .login {
      width: 95%;
    }
  }
</style>
