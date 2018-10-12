/**
 * @desc 友链更新定时任务
 */

const { Subscription } = require('egg')

module.exports = class UpdateSiteLinks extends Subscription {
    static get schedule () {
        return {
            // 每天0点更新一次
            cron: '0 0 * * * *',
            type: 'worker'
        }
    }

    async subscribe () {
        await this.service.setting.updateLinks()
    }
}
