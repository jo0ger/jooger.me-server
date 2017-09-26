/**
 * @desc 
 * @author Jooger <zzy1198258955@163.com>
 * @date 25 Sep 2017
 */

'use strict'

const router = require('koa-router')()
const { article, tag, option, user } = require('../controller')
const { auth } = require('../middleware')
const isAuthenticated = auth.isAuthenticated()

// Article
router.get('/articles', isAuthenticated, article.list)
router.get('/articles/:id', isAuthenticated, article.item)
router.post('/articles', isAuthenticated, article.create)
router.patch('/articles/:id', isAuthenticated, article.update)
router.delete('/articles/:id', isAuthenticated, article.delete)
router.get('/articles/:id/like', isAuthenticated, article.like)

// Tag
router.get('/tags', isAuthenticated, tag.list)
router.get('/tags/:id', isAuthenticated, tag.item)
router.post('/tags', isAuthenticated, tag.create)
router.patch('/tags/:id', isAuthenticated, tag.update)
router.delete('/tags/:id', isAuthenticated, tag.delete)

// Option
router.get('/options', isAuthenticated, option.data)
router.patch('/options', isAuthenticated, option.update)

// User
router.get('/users', isAuthenticated, user.list)
router.post('/users/login', user.login)
router.get('/users/logout', isAuthenticated, user.logout)
router.get('/users/:id', isAuthenticated, user.item)
router.patch('/users/:id', isAuthenticated, user.update)
router.delete('/users/:id', isAuthenticated, user.delete)

module.exports = router
