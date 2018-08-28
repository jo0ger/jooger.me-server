/**
 * @desc 标签 Services
 */

const ProxyService = require('./proxy2')

module.exports = class TagService extends ProxyService {
    get model () {
        return this.app.model.Tag
    }

    async getList (query, select = null, opt) {
        opt = this.app.merge({
            sort: '-createdAt'
        }, opt)
        const categories = await this.model.find(query, select, opt).exec()
        if (categories.length) {
            const PUBLISH = this.app.config.modelValidate.article.state.optional.PUBLISH
            await Promise.all(
                categories.map(async item => {
                    const articles = await this.service.article.getList({
                        category: item._id,
                        state: PUBLISH
                    })
                    item.count = articles.length
                })
            )
        }
        return categories
    }

    async getItem (id, select = null, opt) {
        opt = this.app.merge({
            lean: true
        }, opt)
        const category = await this.model.findById(id, select, opt).exec()
        if (category) {
            category.articles = await this.service.article.getList({ category: category._id })
        }
        return category
    }
}
