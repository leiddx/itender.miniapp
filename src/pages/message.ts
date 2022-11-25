import Moment from 'moment'

import * as MessageService from '../service/message.js'

Page(
	{
		data: {
			items: [],
			serach: {
				limit: 10,
				skip: 0,
			},

			next: true,
			more: false,
		},

		async onLoad() {
			await this.ReadNotice()

		},

		async onPullDownRefresh() {
			let items = []
			let { serach } = this.data

			serach.skip = 0

			this.setData({ items, serach })

			await this.ReadNotice()
			await wx.stopPullDownRefresh()

		},

		async onReachBottom() {
			await this.ReadNoticeNextPage()

		},

		onShareAppMessage() {
			return { title: '海德利招投标信息发布平台' }

		},

		onShareTimeline() {
			return { title: '海德利招投标信息发布平台' }

		},

		async onReadedMessage(e: WechatMiniprogram.CustomEvent<{}, {}, { index: number }>) {
			let { items } = this.data
			let { index } = e.currentTarget.dataset

			let item = items[index]

			await MessageService.Readed(item.id)

			await wx.navigateTo(
				{
					url: `/pages/detail?id=${item.poster.id}`,
				}

			)


		},

		async ReadNotice() {
			let { items, serach } = this.data

			let res = await MessageService.Read(serach)

			let next = res.data.length === serach.limit

			let data = res.data.map(

				d => {
					let { updated } = d

					if (!updated.includes('T')) {
						updated = updated.replace('+', 'T00:00:00+')

					}

					updated = Moment(updated).fromNow()

					return { ...d, updated }

				}

			)

			items = items.concat(data)


			this.setData({ items, next })

		},

		async ReadNoticeNextPage() {
			let { serach, next, } = this.data

			if (!next) {
				return

			}

			serach.skip = serach.skip + serach.limit

			this.setData({ serach })

			await this.ReadNotice()

		}

	}

)
