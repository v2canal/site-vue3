<template>
  <div class="component-profile">
    <n-card v-if="context.isLogIn" title="个人信息">
      <template #cover>
        <img id="avatar" src="http://codeleilei.gitee.io/blog/default_avatar.jpeg">
      </template>
      <p><n-tag type="success" >用户ID</n-tag>{{context.userid}}</p>
      <p><n-tag type="success" >用户名</n-tag>{{context.username}}</p>
      <p><n-tag type="success" >注册时间</n-tag>{{model.createTime}}</p>
<!--      <n-form class="component-profile-form" ref="formRef" :model="model" :rules="rules">-->
<!--        <n-form-item path="oldPassword" label="当前密码">-->
<!--          <n-input v-model:value="model.oldPassword" @keydown.enter.prevent/>-->
<!--        </n-form-item>-->
<!--        <n-form-item path="password" label="密码">-->
<!--          <n-input-->
<!--              v-model:value="model.password"-->
<!--              type="password"-->
<!--              @input="handlePasswordInput"-->
<!--              @keydown.enter.prevent-->
<!--          />-->
<!--        </n-form-item>-->
<!--        <n-form-item-->
<!--            ref="rPasswordFormItemRef"-->
<!--            first-->
<!--            path="reenteredPassword"-->
<!--            label="重复密码"-->
<!--        >-->
<!--          <n-input-->
<!--              v-model:value="model.reenteredPassword"-->
<!--              :disabled="!model.password"-->
<!--              type="password"-->
<!--              @keydown.enter.prevent-->
<!--          />-->
<!--        </n-form-item>-->
<!--        <n-row :gutter="[0, 24]">-->
<!--          <n-col :span="24">-->
<!--            <div style="display: flex; justify-content: flex-end">-->
<!--              <n-button-->
<!--                  :disabled="model.oldPassword === null"-->
<!--                  round-->
<!--                  type="primary"-->
<!--                  @click="handleValidateButtonClick"-->
<!--              >-->
<!--                修改密码-->
<!--              </n-button>-->
<!--            </div>-->
<!--          </n-col>-->
<!--        </n-row>-->
<!--      </n-form>-->
      <n-button tertiary type="primary">
        修改信息
      </n-button>&nbsp;
      <n-button tertiary type="info">
        修改密码
      </n-button>
    </n-card>
    <n-empty description="你是不是还没有登陆？请先登陆吧~" v-if="!context.isLogIn"/>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {inject} from 'vue'
import {
  useMessage
} from "naive-ui";
import {parseDate} from "@/utils/moment";

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const context=inject('context')
    const modelRef = ref({
      username:null,
      oldPassword: null,
      password: null,
      reenteredPassword: null,
      createTime:parseDate(context.userid)
    });
    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.password && modelRef.value.password.startsWith(value) && modelRef.value.password.length >= value.length;
    }

    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }

    const rules = {
      oldPassword: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("请输入当前密码！");
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
      parseDate,
      context,
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
.component-profile {
  padding-top: 10px;
  img{
    width: 75%;
    margin: 0 auto;
  }
  width: 400px;
  margin: 0 auto;
  .component-profile-form {
  }
}
</style>