Component(
	{
		properties: {
			more: { type: Boolean, value: false },

		},

		data: {
			value: '最新公告',

			selective: [
				{ value: '档案', active: false },
				{ value: '法院', active: false },
				{ value: '安防监控', active: false },
				{ value: '系统集成', active: false },
				{ value: '商业服务', active: false },
				{ value: '软件开发', active: false },
			],
		},

		lifetimes: {
			async attached() {
				let { selective } = this.data

				try {
					let d = await wx.getStorage<number[]>({ key: 'category' })

					for (let i of d.data) {
						await this.onPushSelect(i)

					}

				}

				catch {
					await this.onPushSelect(0)
					await this.onPushSelect(1)

				}

				this.setData({ selective })


			}
		},

		methods: {
			onClear() {
				this.setData({ value: '最新公告' })
				this.triggerEvent('select', { value: '' })

			},

			onSelect(e: WechatMiniprogram.CustomEvent<{}, {}, { index: number }>) {
				let { selective } = this.data
				let { index } = e.currentTarget.dataset

				let { value } = selective[index]

				this.setData({ value })
				this.triggerEvent('select', { value })

			},

			onCloseSelective() {
				this.setData({ more: false })

			},

			oncatchtapSelective() {

			},

			onToggleSelective(e: WechatMiniprogram.CustomEvent<{}, {}, { index: number }>) {
				let { selective } = this.data
				let { index } = e.currentTarget.dataset

				let active = !selective[index].active

				this.ToggleSelect(index, active)

			},

			async onPushSelect(index: number) {
				await this.ToggleSelect(index, true)

			},

			async onPopSelect(index: number) {
				await this.ToggleSelect(index, false)

			},

			async ToggleSelect(index: number, active: boolean) {
				let { selective } = this.data

				if (!selective[index]) {
					return

				}

				selective[index].active = active

				let d = selective.reduce(
					(a, b, i) => {
						if (b.active) {
							a.push(i)

						}

						return a

					},

					[]
				)

				this.setData({ selective })

				await wx.setStorage({ key: 'category', data: d })

			}

		},

	}

)