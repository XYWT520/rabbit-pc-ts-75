<script lang="ts" setup name="LoginForm">
import { ref, watch } from 'vue';
import { Message } from '@/components/message';
import useStore from '@/store'
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate'

const router = useRouter()
const { user } = useStore()
const active = ref<'account' | 'qrcode'>('account')
// const isAgree = ref(false)
const login = async () => {
  // 表单校验
  // if (form.value.account === '') {
  //   Message({ type: 'error', text: '用户名或手机号不能为空' })
  //   return
  // }
  // if (form.value.password === '') {
  //   Message({ type: 'error', text: '密码不能为空' })
  //   return
  // }
  // if (!form.value.isAgree) {
  //   Message({ type: 'error', text: '请同意许可' })
  //   return
  // }
  // console.log('通过校验，可以发送请求')
  const res = await validate()
  console.log(res);
  if (!res.valid) return
  try {
    // 发送请求
    await user.login({ account: account.value, password: password.value })
    // 消息提示
    Message.success('登录成功')
    // 跳转到首页
    router.push('/')
  } catch (e) {
    console.log(e);
  }
}
// validate 时兜底校验
// resetForm 是清空表单的校验结果
const { resetForm, validate } = useForm({
  validationSchema: {
    // 通过就 return true , 不通过就 return 错误的信息
    account(value: string) {
      // value 时将来使用该规则的表单元素的值
      // 1. 必填
      // 2. 6-20个字符
      // 如何反馈校验成功还是失败, 返回 true 才是成功, 其他情况失败, 返回失败原因
      if (!value) return '请输入用户名'
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头并且是6-20个字符'
      return true
    },
    password(value: string) {
      if (!value) return '请输入密码'
      if (!/^\w{6,24}$/.test(value)) return '密码为6-24位字符'
      return true
    },
    isAgree(value: boolean) {
      if (!value) return '请勾选用户协议'
      return true
    },
    mobile(value: string) {
      if (!value) return '请输入手机号码'
      if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
      return true
    },
    code(value: string) {
      if (!value) return '请输入验证码'
      if (!/^\d{6}$/.test(value)) return '验证码格式错误'
      return true
    }
  }
})


    
  




// 会返回一个对象, 一般直接进行解构
// 将其中的 value 和 errorMessage 提取出来
// value 属性是一个响应式的额值, 用于给表单元素进行双向绑定
const { value: account, errorMessage: accountMessage } = useField<string>('account')
const { value: password, errorMessage: passwordMessage } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeMessage } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileMessage } = useField<boolean>('mobile')
const { value: code, errorMessage: codeMessage } = useField<boolean>('code')

// const form = ref({
//   account: '',
//   password: '',
//   isAgree: false,
// })

watch(active, () => {
  resetForm()
})

</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="active = 'account'" href="javascript:;" v-if="active === 'qrcode'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="active = 'qrcode'" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="active === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="account" type="text" placeholder="请输入用户名或手机号" />
          </div>
          <div class="error"><i class="iconfont icon-warning" v-if="accountMessage" />{{ accountMessage }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error"><i class="iconfont icon-warning" v-if="passwordMessage" />{{ passwordMessage }}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error"><i class="iconfont icon-warning" v-if="mobileMessage" />{{ mobileMessage }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="password" placeholder="请输入验证码" />
            <span class="code">发送验证码</span>
          </div>
          <div class="error"><i class="iconfont icon-warning" v-if="codeMessage" />{{ codeMessage }}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <XtxCheck :label="'我同意'" v-model="isAgree" /> -->
          <!-- 使用插槽 -->
          <XtxCheck v-model="isAgree">我同意</XtxCheck>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error"><i class="iconfont icon-warning" v-if="isAgreeMessage" />{{ isAgreeMessage }}</div>
      </div>

      <a @click="login" href="javascript:;" class="btn">登录</a>
    </div>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
