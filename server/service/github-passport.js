/**
 * @desc github password service
 * @author Jooger <zzy1198258955@163.com>
 * @date 27 Sep 2017
 */

'use strict'

const passport = require('koa-passport')
const GithubStrategy = require('passport-github').Strategy
const config = require('../config')
const { clientID, clientSecret, callbackURL } = config.sns.github
const { randomString, setDebug } = require('../util')
const debug = setDebug('auth:github')

exports.init = (UserModel, config) => {
  passport.use(new GithubStrategy({
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    debug('github auth start')
    try {
      const user = await UserModel.findOne({
        'github.id': profile.id
      }).catch(err => {
        debug('user check error, err: ', err.message)
        return null
      })

      
      if (user) {
        const userData = {
          name: profile.displayName || profile.username,
          avatar: profile._json.avatar_url,
          slogan: profile._json.bio,
          github: profile._json,
          role: user.role
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, userData).exec().catch(err => {
          debug('user update error, err: ', err.message)
        }) || user

        return end(null, updatedUser)
      }

      const newUser = {
        name: profile.displayName || profile.username,
        avatar: profile._json.avatar_url,
        slogan: profile._json.bio,
        github: profile._json,
        role: 1
      }

      newUser.github.token = accessToken

      const checkUser = await UserModel.findOne({ name: newUser.name }).exec().catch(err => {
        debug('user check error, err: ', err.message)
        return true
      })

      if (checkUser) {
        newUser.name += '-' + randomString()
      }

      const data = await new UserModel(newUser).save().catch(err => {
        debug('user create fail, err: ', err.message)
      })
      
      return end(null, data)
    } catch (err) {
      debug('github auth error')
      return end(err)
    }

    function end (err, data) {
      debug('github auth finish')
      done(err, data)
    }
  }))
}

