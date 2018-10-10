const mongoosePaginate = require('mongoose-paginate-v2')
const lodash = require('lodash')
const merge = require('merge')

const prefix = 'http://'

module.exports = {
    // model schema处理
    processSchema (schema, options = {}, middlewares = {}) {
        if (!schema) {
            return null
        }
        schema.set('versionKey', false)
        schema.set('toObject', { getters: true, virtuals: false })
        schema.set('toJSON', { getters: true, virtuals: false })
        schema.add({
            // 创建日期
            createdAt: { type: Date, default: Date.now },
            // 更新日期
            updatedAt: { type: Date, default: Date.now }
        })
        if (options && options.paginate) {
            schema.plugin(mongoosePaginate)
        }
        schema.pre('findOneAndUpdate', function (next) {
            this._update.updatedAt = Date.now()
            next()
        })
        Object.keys(middlewares).forEach(key => {
            const fns = middlewares[key]
            Object.keys(fns).forEach(action => {
                schema[key](action, fns[action])
            })
        })
        return schema
    },
    merge () {
        return merge.recursive.apply(null, [true].concat(Array.prototype.slice.call(arguments)))
    },
    proxyUrl (url) {
        if (lodash.isString(url) && url.startsWith(prefix)) {
            return url.replace(prefix, `${this.config.author.url}/proxy/`)
        }
        return url
    },
    // 获取分页请求的响应数据
    getDocsPaginationData (docs) {
        if (!docs) return null
        return {
            list: docs.docs,
            pageInfo: {
                total: docs.totalDocs,
                current: docs.page > docs.totalPages ? docs.totalPages : docs.page,
                pages: docs.totalPages,
                limit: docs.limit
            }
        }
    }
}
