/**
 * @desc 公共的model proxy service
 */

const { Service } = require('egg')

module.exports = class ProxyService extends Service {
    init () {
        return this.model.init()
    }

    getList (query, select = null, opt, populate = []) {
        const Q = this.model.find(query, select, opt)
        if (populate) {
            [].concat(populate).forEach(item => Q.populate(item))
        }
        return Q.exec()
    }

    getItem (query, select = null, opt, populate = []) {
        opt = this.app.merge({
            lean: true
        }, opt)
        const Q = this.model.findOne(query, select, opt)
        if (populate) {
            [].concat(populate).forEach(item => Q.populate(item))
        }
        return Q.exec()
    }

    getItemById (id, select = null, opt, populate = []) {
        opt = this.app.merge({
            lean: true
        }, opt)
        const Q = this.model.findById(id, select, opt)
        if (populate) {
            [].concat(populate).forEach(item => Q.populate(item))
        }
        return Q.exec()
    }

    create (data) {
        return new this.model(data).save()
    }

    updateItem (query = {}, data, opt, populate = []) {
        opt = this.app.merge({
            lean: true,
            new: true
        })
        const Q = this.model.findOneAndUpdate(query, data, opt)
        if (populate) {
            [].concat(populate).forEach(item => Q.populate(item))
        }
        return Q.exec()
    }

    updateItemById (id, data, opt, populate = []) {
        opt = this.app.merge({
            lean: true,
            new: true
        })
        const Q = this.model.findByIdAndUpdate(id, data, opt)
        if (populate) {
            [].concat(populate).forEach(item => Q.populate(item))
        }
        return Q.exec()
    }

    deleteItemById (id, opt) {
        return this.model.findByIdAndDelete(id, opt).exec()
    }

    aggregate (pipeline = []) {
        return this.model.aggregate(pipeline)
    }
}
