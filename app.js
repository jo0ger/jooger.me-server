'use strict'

const path = require('path')

module.exports = app => {
    app.loader.loadToApp(path.join(app.config.baseDir, 'app/utils'), 'utils')
    addValidateRule(app)
    setSessionstore(app)
    app.beforeStart(async () => {
        const ctx = app.createAnonymousContext()
        await ctx.service.auth.seed()
    })
}

function addValidateRule (app) {
    app.validator.addRule('objectId', (rule, val) => {
        const valid = app.utils.validate.isObjectId(val)
        if (!valid) {
            return 'must be objectId'
        }
    })
    app.validator.addRule('email', (rule, val) => {
        return app.utils.validate.isEmail(val)
    })
    app.validator.addRule('url', (rule, val) => {
        return app.utils.validate.isSiteUrl(val)
    })
}

function setSessionstore (app) {
    app.sessionStore = class Store {
        constructor (app) {
            this.app = app
            this.client = app.redis.get('token')
        }

        async get (key) {
            const res = await this.client.get(key)
            if (!res) return null
            return JSON.parse(res)
        }

        async set (key, value, maxAge) {
            if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
            value = JSON.stringify(value);
            await this.client.set(key, value, 'PX', maxAge);
        }

        async destroy (key) {
            await this.client.del(key)
        }
    }
}
