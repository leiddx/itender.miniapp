import QueryString from 'query-string'
import Axios, { AxiosError } from 'axios'
import AxiosMiniprogramAdapter from 'axios-miniprogram-adapter'

Axios.defaults.adapter = AxiosMiniprogramAdapter


const app = getApp()
const manager = wx.getUpdateManager()

let login: WechatMiniprogram.LoginSuccessCallbackResult = null


const request = Axios.create(
	{
		baseURL: app.hostname,
		paramsSerializer(p: Record<string, unknown>) {
			return QueryString.stringify(p, { arrayFormat: 'comma' })

		},

	}

)


manager.onUpdateReady(
	async function () {
		await wx.showModal(
			{
				title: '发现新版本',
				content: '应用将重新启动',
				showCancel: false,
			},

		)

		manager.applyUpdate()

	},

)

request.interceptors.request.use(
	async function (config) {
		if (login === null) {
			login = await wx.login()

			Axios.post(
				'/user',

				login,

				{ baseURL: app.hostname, }

			)

		}

		config['headers']['common']['code'] = login.code

		return config

	},

)


request.interceptors.response.use(
	res => res,

	function (error: AxiosError<Error>) {
		let message = error?.response?.data?.message

		if (message) {
			throw new Error(message)

		}

		throw error

	},

)


export { Axios }

export default request

