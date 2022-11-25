import Moment from 'moment'

import * as Model from '../model.js'

import * as PosterService from '../service/poster.js'

type RichTextNode = {
	name: string
	attrs: Record<string, string>
	children: Array<
		{
			type: string
			text: string
		}
	>
}

type Poster = Exclude<Model.Poster, 'body' | ' delivery' | 'updated' | 'created'> & {
	body: Array<RichTextNode>

	delivery: string
	created: string
	updated: string
}

Page(
	{
		data: {
			subscribe: false,
			item: {} as Poster,
		},

		async onLoad(query) {
			let { id } = query

			let res = await PosterService.Dateil(id)


			let subscribe = res.headers['X-Subscribe'] === 'true'

			let body = res.data.body
				.split('\n')
				.map<RichTextNode>(
					v => {
						return {
							name: 'p',
							attrs: {
								class: 'pp',
								style: 'font-size: 28rpx; line-height: 1.4; color: #303133; text-align: justify;text-justify: auto;'
							},
							children: [
								{ type: 'text', text: v }
							]
						}

					}

				)

			let { delivery, created, updated } = res.data

			if (!delivery.includes('T')) {
				delivery = delivery.replace('+', 'T00:00:00+')

			}

			if (!created.includes('T')) {
				created = created.replace('+', 'T00:00:00+')

			}

			if (!updated.includes('T')) {
				updated = updated.replace('+', 'T00:00:00+')

			}

			delivery = Moment(delivery).format('YYYY-MM-DD HH:mm')

			updated = Moment(updated).fromNow()
			created = Moment(created).format('YYYY-MM-DD HH:mm')

			let item = { ...res.data, body, delivery, updated, created } as Poster

			this.setData({ subscribe, item })

		},

		onShareAppMessage() {
			let { id, name } = this.data.item

			return { title: name, path: `/pages/detail?id=${id}` }

		},

		onShareTimeline() {
			let { name } = this.data.item

			return { title: name }

		},


		async onToggleSubscribe() {
			let { subscribe, item } = this.data

			if (subscribe) {
				await PosterService.UnSubscribe(item.id)

			}

			else {
				await PosterService.Subscribe(item.id)

			}


			this.setData({ subscribe: !subscribe })

		}

	}

)
