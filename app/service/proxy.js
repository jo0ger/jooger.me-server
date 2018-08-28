/**
 * @desc 公共的model proxy service
 */

const { Service } = require('egg')

module.exports = class ProxyService extends Service {
    init () {
        return this.model.init()
    }

    newAndSave (docs) {
        if (!Array.isArray(docs)) {
            docs = [docs]
        }
        return this.model.create(docs)
    }

    paginate (query, opt = {}) {
        return this.model.paginate(query, opt)
    }

    findById (id, select = null, opt = {}) {
        return this.model.findById(id, select, opt)
    }

    find (query = {}, select = null, opt = {}) {
        return this.model.find(query, select, opt)
    }

    findOne (query = {}, select = null, opt = {}) {
        return this.model.findOne(query, select, opt)
    }

    updateItemById (id, doc, opt = {}) {
        return this.model.findByIdAndUpdate(id, doc, Object.assign({ new: true }, opt))
    }

    updateOne (query = {}, doc = {}, opt = {}) {
        return this.model.findOneAndUpdate(query, doc, Object.assign({ new: true }, opt))
    }

    updateMany (query = {}, doc = {}, opt = {}) {
        return this.model.update(query, doc, Object.assign({ multi: true }, opt))
    }

    remove (query = {}) {
        return this.model.remove(query)
    }

    deleteItemById (id = '') {
        return this.model.deleteOne({ _id: id })
    }

    deleteItemByIds (ids = []) {
        return this.model.deleteMany({
            _id: {
                $in: ids
            }
        })
    }

    aggregate (opt = {}) {
        return this.model.aggregate(opt)
    }

    count (query = {}) {
        return this.model.count(query)
    }
}
