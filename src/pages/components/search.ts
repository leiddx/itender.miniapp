Component(
	{
		data: {
			value: '',
		},

		methods: {
			onSearch() {
				let { value } = this.data

				this.triggerEvent('input', { value })

			},

			onMore() {
				this.triggerEvent('more')

			},

		},

	}

)