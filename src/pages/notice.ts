import Moment from 'moment'

import * as NoticeService from '../service/notice.js'

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

		async ReadNotice() {
			let { items, serach } = this.data

			let res = await NoticeService.Read(serach)

			let next = res.data.length === serach.limit

			let data = res.data.map(

				d => {
					let { poster } = d

					if (!poster.created.includes('T')) {
						poster.created = poster.created.replace('+', 'T00:00:00+')

					}

					if (!poster.updated.includes('T')) {
						poster.updated = poster.updated.replace('+', 'T00:00:00+')

					}

					let updated = Moment(poster.updated).fromNow()
					let created = Moment(poster.created).format('YYYY-MM-DD')

					return { ...poster, updated, created }

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
