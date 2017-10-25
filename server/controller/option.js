/**
 * @desc Option controller
 * @author Jooger <zzy1198258955@163.com>
 * @date 26 Sep 2017
 */

'use strict'

const { OptionModel } = require('../model')
const { getGithubUsersInfo } = require('../service')
const { updateSongListMap } = require('./music')
const debug = require('../util').setDebug('option')

exports.data = async (ctx, next) => {
  const data = await OptionModel.findOne().exec().catch(err => {
    ctx.log.error(err.message)
    return null
  })

  if (data) {
    ctx.success(data)
  } else {
    ctx.fail()
  }
}

exports.update = async (ctx, next) => {
  const option = ctx.request.body

  const data = await exports.updateOption(option)

  if (data) {
    ctx.success(data)
  } else {
    ctx.fail()
  }
}

exports.updateOption = async function (option = null) {
  debug('timed update option...')
  if (!option) {
    option = await OptionModel.findOne().exec().catch(err => {
      ctx.log.error(err.message)
      return {}
    })
  }

  // 更新友链
  option.links = await generateLinks(option.links)

  const data = await OptionModel.findOneAndUpdate({}, option, { new: true }).exec().catch(err => {
    ctx.log.error(err.message)
    return null
  })

  // 更新 music list
  await updateSongListMap()

  if (data) {
    debug.success('timed update option success...')
  }
  return data
}

// 更新友链
async function generateLinks (links = []) {
  if (links && links.length) {
    const githubNames = links.map(link => link.github)
    const usersInfo = await getGithubUsersInfo(githubNames)

    if (usersInfo) {
      return links.map((link, index) => {
        const userInfo = usersInfo[index]
        if (userInfo) {
          link.avatar = userInfo.avatar_url
          link.slogan = userInfo.bio
          link.site = link.site || userInfo.blog
        }
        return link
      })
    }
  }
  return links
}

// 每1小时更新一次
setInterval(exports.updateOption, 1000 * 60 * 60 * 1)
