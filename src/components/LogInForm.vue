<template>
  <div class="component-login">
    <n-form class="component-login-form">
      <n-form-item path="age" label="用户名">
        <n-input v-model:value="model.username" @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">

        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button @click="handleRegister" quaternary round type="primary">
              去注册
            </n-button>
            <n-button
                :disabled="(model.password === null || model.username=== null)"
                round
                type="primary"
                @click="handleLogin"
            >
              登陆
            </n-button>

          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script>
import {inject,defineComponent, ref} from "vue";
import {
  useMessage
} from "naive-ui";
import {router} from '@/router'
import {logIn} from "@/api/user";

export default defineComponent({
  setup() {
    const message = useMessage();
    const context=inject('context')
    const modelRef = ref({
      username: null,
      password: null,
    });

    function handleRegister() {
      router.push({path: 'register'})
    }
    function handleLogin(){
      logIn({username:modelRef.value.username,password:modelRef.value.password})
      .then(_=>{
        message.success('登陆成功');
        router.push({path: '/'})
        context.isLogIn=true
        context.username=modelRef.value.username
      })
      .catch(_=>{
        message.error('用户名或密码错误')
      })
    }
    return {
      handleRegister,
      model: modelRef,
      handleLogin,
    };
  }
});
</script>

<style lang="scss" scoped>
.component-login {
  .component-login-form {
    padding-top: 100px;
    width: 400px;
    margin: 0 auto;
  }
}
</style>