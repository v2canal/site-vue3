<template>
  <div class="component-register">
    <n-form class="component-register-form" ref="formRef" :model="model" :rules="rules">
      <n-form-item path="username" label="用户名">
        <n-input v-model:value="model.username" @keydown.enter.prevent/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          label="重复密码"
      >
        <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.password"
            type="password"
            @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
                :disabled="model.username === null"
                round
                type="primary"
                @click="handleValidateButtonClick"
            >
              注册
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {
  useMessage
} from "naive-ui";
import {register} from "@/api/user";
import {router} from '@/router'
export default defineComponent({
  setup() {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      username: null,
      password: null,
      reenteredPassword: null
    });

    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.password && modelRef.value.password.startsWith(value) && modelRef.value.password.length >= value.length;
    }

    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }

    const rules = {
      username: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("请输入用户名！");
            } else if (value.length <= 2) {
              return new Error("用户名过短，请至少输入3个字符");
            } else if (value.length > 18) {
              return new Error("用户名过长！");
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      password: [
        {
          required: true,
          message: "请输入密码"
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: "请再次输入密码",
          trigger: ["input", "blur"]
        },
        {
          validator: validatePasswordStartWith,
          message: "两次密码输入不一致",
          trigger: "input"
        },
        {
          validator: validatePasswordSame,
          message: "两次密码输入不一致",
          trigger: ["blur", "password-input"]
        }
      ]
    };
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({trigger: "password-input"});
        }
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            //验证表单成功，请求注册接口~
            console.log(modelRef)
            register({username: modelRef.value.username, password: modelRef.value.password})
                .then(() => {
                  message.success("注册成功");
                  router.push({path:'/login'})
                })
                .catch(err => {
                  message.error(err)
                })
          } else {
            console.log(errors);
            message.error("注册失败");
          }
        });
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.component-register {
  .component-register-form {
    padding-top: 100px;
    width: 400px;
    margin: 0 auto;
  }
}
</style>