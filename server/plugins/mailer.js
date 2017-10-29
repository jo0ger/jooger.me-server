/**
 * @desc Mail plugin
 * @author Jooger <zzy1198258955@163.com>
 * @date 29 Oct 2017
 */

'use strict'

const nodemailer = require('nodemailer')
const config = require('../config')
const { getDebug } = require('../util')
const debug = getDebug('Mailer')

let isVerify = false
const transporter = nodemailer.createTransport({
  service: '163',
  secure: true,
  auth: {
    user: config.email,
    pass: '19950102zzy'
  }
})

exports.start = async () => {
  return new Promise((resolve, reject) => {
    transporter.verify((err, success) => {
      if (err) {
        isVerify = false
        debug.error('服务初始化失败，将在1分钟后重试，错误：', err.message)
        reject(err)
        setTimeout(verifyMailClient, 60 * 1000)
      } else {
        isVerify = true
        debug.success('服务启动成功')
        resolve()
      }
    })
  })
}

/**
 * @desc 发送邮件
 * @param  {Object} opt={}            邮件参数
 * @param  {Boolean} toMe=false       是否是给自己发送邮件
 */
exports.send = (opt = {}, toMe = false) => {
  if (!isVerify) {
    return debug.error('客户端未验证，拒绝发送邮件')
  }
  opt.from = `${config.author} <${config.email}>`
  if (toMe) {
    opt.to = config.email
  }
  transporter.sendMail(opt, (err, info) => {
    if (err) {
      return debug.error('邮件发送失败，错误：', err.message)
    }
    debug.success('邮件发送成功', info.messageId, info.response)
  })
}

