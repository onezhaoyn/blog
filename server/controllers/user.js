const userModel = require('../models/user')
const crypto = require('crypto')

module.exports = {
  // 定义登陆验证方法
  authLogin: async (ctx, next) => {
    try {
      let md5 = crypto.createHash('md5')  // 使用 crypto 模块将输入的登陆密码转换为 MD5 加密格式
      var pwdMd5 = md5.update(ctx.request.body.pwd).digest('hex')
     
      let result = await userModel.findOne({name: ctx.request.body.name}, null)   // 在数据库中按照输入的登录名查找
      if(!result) {
        ctx.body = {
          msg: '用户不存在！',
          code: -1
        }
      } else {
        if(pwdMd5 !== result.password) {
          ctx.body = {
            msg: '用户名或密码错误！',
            code: -2
          }
        } else {
          ctx.session.user = result   // 将用户信息保存至session中
          ctx.body = {
            msg: '登陆成功！',
            code: 1,
          }
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        msg: 'server error',
        code: 0
      }
    }
  }

}