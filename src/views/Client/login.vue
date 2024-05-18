<template>
  <div
    class="client-login"
    O-B
  >
    <header>
      <div O-R>
        <span>Hi! 欢迎登录</span>
      </div>
      <div>
        <span>AIOps 智能运维平台</span>
      </div>
      <ClientRect />
    </header>
    <main>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            size="large"
            placeholder="请输入用户名"
            name="username"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            size="large"
            placeholder="请输入密码"
            type="password"
            show-password
            name="password"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </main>
    <footer>
      <div>
        <el-button
          type="primary"
          style="width: 100%;"
          @click="login"
        >
          登 录
        </el-button>
      </div>
      <div>
        <el-text
          class="client-login__text"
          type="danger"
        >{{ msg }}</el-text>
      </div>
    </footer>
  </div>
</template>

<script>
import ClientRect from '@/components/ClientRect'
import { login } from '@/api/user'
import { message } from '@/utils/utils'
import { setToken, removeToken } from '@/utils/auth'
export default {
  components: {
    ClientRect
  },
  data() {
    return {
      loginForm: {
        username: 'aiops@admin',
        password: 'nkcs@aiops'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名未输入' }],
        password: [{ required: true, trigger: 'blur', message: '密码未输入' }]
      },
      msg: ''
    }
  },
  methods: {
    login() {
      // if (!this.loginForm.username) {
      //   this.msg = '请输入用户名'
      //   return
      // }
      // if (!this.loginForm.password) {
      //   this.msg = '请输入密码'
      //   return
      // }
      // this.msg = ''
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          removeToken()
          login({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then((res) => {
            setToken(res.token)
            this.$router.push({
              path: '/'
            })
          }).catch((err) => {
            try {
              this.msg = err.response.data.message
            } catch {
              this.msg = '网络故障'
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.client-login {
  text-align: center;
  width: 400px;
  height: auto;
  max-width: 100%;
  background-color: rgba(255,255,255,0.5);
  box-shadow: 0px 0px 32px 0px rgba(205,213,218,0.5);
  border-radius: 24px;
  border: 1px solid #FFFFFF;
  backdrop-filter: blur(20px);
}
.client-login > header {
  border: 1px solid transparent;
}
.client-login > header > div {
  margin: 10px 0px;
}
.client-login > header:first-child {
  font-size: 14px;
}
.client-login > header > div:nth-child(2) {
  font-size: 20px;
  color: #374E5C;
}
.client-login > main,
.client-login > footer {
  padding: 10px 40px 0px 40px;
}
.client-login > main > * {
  margin: 6px 0px;
}
.client-login__text::before {
  content: ' ';
  display: inline-block;
  position: relative;
}
</style>
