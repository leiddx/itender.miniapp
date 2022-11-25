import Moment from 'moment'

import * as PosterService from '../service/poster.js'

Page(
	{
		data: {
			items: [],
			serach: {
				keyword: '',
				category: '',
				limit: 10,
				skip: 0,
			},

			next: true,
			more: false,
		},

		async onLoad() {
			await this.ReadPoster()

		},

		async onReachBottom() {
			await this.ReadPosterNextPage()

		},

		onShareAppMessage() {
			return { title: '海德利招投标信息发布平台' }

		},

		onShareTimeline() {
			return { title: '海德利招投标信息发布平台' }

		},

		async onSearch(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
			let items = []
			let { value } = e.detail
			let { serach } = this.data

			serach.skip = 0
			serach.keyword = value

			this.setData({ items, serach })

			await this.ReadPoster()

		},

		onFilterCategory() {
			this.setData({ more: true })

		},

		onSelectCategory(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
			let items = []
			let { value } = e.detail
			let { serach } = this.data

			serach.skip = 0
			serach.category = value

			this.setData({ items, serach })

			this.ReadPoster()

		},


		async ReadPoster() {
			let { items, serach } = this.data

			let res = await PosterService.Read(serach)

			let next = res.data.length === serach.limit

			let data = res.data.map(

				d => {
					let { created, updated } = d

					if (!created.includes('T')) {
						created = created.replace('+', 'T00:00:00+')

					}

					if (!updated.includes('T')) {
						updated = updated.replace('+', 'T00:00:00+')

					}

					updated = Moment(updated).fromNow()
					created = Moment(created).format('YYYY-MM-DD')

					return { ...d, updated, created }

				}

			)

			items = items.concat(data)


			this.setData({ items, next })

		},

		async ReadPosterNextPage() {
			let { serach, next, } = this.data

			if (!next) {
				return

			}

			serach.skip = serach.skip + serach.limit

			this.setData({ serach })

			await this.ReadPoster()

		}

	}

)
