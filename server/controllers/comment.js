const commentModel = require('../models/comment')
const getTimeObj = require('../utils/getTimeObj')

module.exports = {
  // 获取评论处理函数
  async getComments (ctx, next) {
    let condition = ctx.params
    let option = { sort: {createTime: -1} }
    let comments = await commentModel.find(condition, {}, option)
    ctx.response.body = {
      comments
    }
  },

  // 保存评论处理函数
  async saveComment (ctx, next) {
    let ip = (  // 确定用户ip
      ctx.request.ip ||
      ctx.request.ips[0] ||
      ctx.request.socket.remoteAddress ||
      ctx.request.headers['x-real-ip'] ||
      ctx.request.headers['x-forwarded-for'] 
    ).replace('::ffff:', '')
    let { content, articleId, fromWhom } = ctx.request.body
    let createTime = getTimeObj()
    let newDoc = new commentModel({
      createTime,
      ip,
      articleId,
      content,
      fromWhom
    })
    let result = await newDoc.save()
    console.log(result)
    ctx.response.body = {
      message: '回复成功'
    }
  },

  // 保存子评论处理函数（在评论document中增加子评论字段）
  async updateComment (ctx, next) {
    let { _id, isReplyToParent, content, fromWhom, toWhom } = ctx.request.body
    let createTime = getTimeObj()
    let subComment = {
      isReplyToParent,
      createTime,
      content,
      fromWhom,
      toWhom 
    }
    let commentDoc = await commentModel.findOne({_id})
    commentDoc.subComments.push(subComment)
    await commentDoc.save()
    ctx.response.body = {
      message: '回复成功'
    }
  },

  async likeComment (ctx, next) {
    let {id} = ctx.params
    let result = await commentModel.updateOne({_id: id}, { $inc: {likes: 1} })
    if (result.nModified !== 0) 
      ctx.response.body = {
        success: true,
      }
    else
      ctx.response.body = {
        success: false,
      }
  },
  
  async dislikeComment (ctx, next) {
    let {id} = ctx.params
    let result = await commentModel.updateOne({_id: id}, { $inc: {likes: -1} })
    if (result.nModified !== 0) 
      ctx.response.body = {
        success: true,
      }
    else
      ctx.response.body = {
        success: false,
      }
    }
}