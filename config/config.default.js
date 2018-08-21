'use strict'

module.exports = appInfo => {
    const config = exports = {}

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1534765762288_2697'

    config.version = appInfo.pkg.version

    config.isLocal = appInfo.env === 'local'

    config.isProd = appInfo.env === 'prod'

    // add your config here
    config.middleware = [
        'gzip',
        'response',
        'error',
        'headers'
    ]

    config.bodyParser = {
        jsonLimit: '10mb'
    }

    config.gzip = {
        threshold: 1024
    }

    config.console = {
        debug: true,
        error: true
    }

    // mongoose配置
    config.mongoose = {
		url: 'mongodb://127.0.0.1/node-server',
		options: {
            useNewUrlParser: true,
			poolSize: 20,
			keepAlive: true,
			autoReconnect: true,
			reconnectInterval: 1000,
			reconnectTries: Number.MAX_VALUE
		}
    }

    // allowed origins
    config.allowedOrigins = ['jooger.me', 'www.jooger.me', 'admin.jooger.me']

    // 请求响应code
    config.codeMap = {
        '-1': '请求失败',
        '200': '请求成功',
        '401': '权限校验失败',
        '403': 'Forbidden',
        '404': '资源未找到',
        '422': '参数校验失败',
        '500': '服务器错误'
    }

    config.onerror = {
        json: (err, ctx) => {
            ctx.body = { message: 'error' };
            ctx.status = 500
        }
    }

    return config
}
