/**
 * @desc Setting Controller
 */

const { Controller } = require('egg')

module.exports = class SettingController extends Controller {
    get rules () {
        return {
            index: {
                filter: { type: 'string', required: false }
            },
            update: {
                site: { type: 'object', required: false },
                personal: { type: 'object', required: false },
                keys: { type: 'object', required: false },
                limit: { type: 'object', required: false }
            }
        }
    }

    async index () {
        const { ctx } = this
        ctx.validate(this.rules.index, ctx.query)
        let select = null
        if (ctx.query.filter) {
            select = ctx.query.filter
        }
        const data = await this.service.setting.getItem({}, select)
        data
            ? ctx.success(data, '配置获取成功')
            : ctx.fail('配置获取失败')
    }

    async update () {
        const { ctx } = this
        const body = ctx.validateBody(this.rules.update)
        const exist = await this.service.setting.getItem()
        if (!exist) {
            return ctx.fail('配置未找到')
        }
        const update = this.app.merge({}, exist, body)
        await this.service.setting.updateItemById(exist._id, update)
        if (body.site && body.site.links) {
            // 抓取友链
            await this.service.setting.updateLinks()
        }
        // 更新github信息
        const data = await this.service.setting.updateGithubInfo()
        data
            ? ctx.success(data, '配置更新成功')
            : ctx.fail('配置更新失败')
    }
}
