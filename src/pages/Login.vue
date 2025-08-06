<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-title">
        欢迎登录-畅聊
      </div>
      <div class="login-form">
        <el-form :model="form" label-width="auto" style="max-width: 500px">
        <el-form-item label="账号" style="color: white;">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%;"  color="#626aef"  @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import axios from 'axios'

// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  const resp = await axios.post('/auth/login',form)
  if (resp.data.code === 200) {
    // 登录成功，跳转到聊天页面
    window.location.href = '/chat'
  } else {
    // 登录失败，显示错误信息
    alert(resp.data.message || '登录失败，请重试')
  }
}

</script>

<style scoped>
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;

  .login-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    width: 558px;
    height: 388px;
    border-radius: 15px;

    .login-title{
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }
}
}


</style>
