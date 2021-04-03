import request from '@/utils/request';
import qs from 'qs'
// 请求登录接口
export async function fakeAccountLogin(params) {
  const data =  qs.stringify(params)
  return request.post('/api/login', {
    data,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  });
}
// 请求验证码接口
export async function getFakeCaptcha(phoneNumber) {
  return request.post('/api/sms/authCode',{
    data:{
      // phoneNumber,
      // 返回状态即可
      bizType:"SIGN_IN"
    }
  });
}

// 返回验证码登录接口
export async  function realAccountLogin(smsCode){
  return request.post('/api/smsAuth',{
    data:smsCode.captcha
  })
}