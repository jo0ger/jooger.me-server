const { Controller } = require('egg')

module.exports = class StatController extends Controller {
    get rules () {
        return {
            trend: {
                startDate: { type: 'string', required: true },
                endDate: { type: 'string', required: true },
                dimension: {
                    type: 'enum',
                    values: this.service.stat.dimensionsValidate,
                    required: true
                },
                target: { type: 'string', required: true  }
            }
        }
    }

    async count () {
        // 文章浏览量 文章点赞数 文章评论量 站内留言量
        const [pv, up, comment, message, user] = await Promise.all(
            ['pv', 'up', 'comment', 'message', 'user'].map(type => {
                return this.service.stat.getCount(type)
            })
        )
        this.ctx.success({
            pv,
            up,
            comment,
            message,
            user
        }, '获取数量统计成功')
    }

    async trend () {
        const { ctx } = this
        ctx.validate(this.rules.trend, ctx.query)
        const { startDate, endDate, dimension, target } = ctx.query
        const trend = await this.service.stat.trendRange(
            startDate,
            endDate,
            dimension,
            target
        )
        this.ctx.success({
            target,
            dimension,
            startDate,
            endDate,
            trend
        }, '获取趋势统计成功')
    }
}
