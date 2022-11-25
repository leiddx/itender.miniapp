/**
 * 用户
 */
export type User = {
	id: string

	// 微信id
	openid: string

	// 微信登录时获取的 code，可通过wx.login获取
	code: string

	// 昵称
	nickname: string

	// 头像
	avatar: string

	// 创建时间
	created: string

	// 更新时间
	updated: string
}

/**
 * 公告
 */
export type Poster = {
	id: string

	// 名称
	name: string

	// 编号
	serial: string

	// 发布单位
	release: string

	// 预算金额
	estimate: number

	// 最高限价
	limit: number

	// 分类
	category: string

	// 项目概括
	belike: string

	// 内容
	body: string

	// 状态
	// 废标
	// 采购公告
	// 结果公告
	// 合同公告
	state: string

	// 投标时间
	delivery: string

	// 创建时间
	created: string

	// 更新时间
	updated: string
}

/**
 * 订阅
 */
export type Notice = {
	id: string

	// 用户
	user: User

	// 公告
	poster: Poster

	// 创建时间
	created: string

	// 更新时间
	updated: string
}

/**
 * 消息
 */
export type Message = {
	id: string

	// 用户
	user: User

	// 公告
	poster: Poster

	// 状态
	// 内容有变动
	// 废标
	// 采购公告
	// 结果公告
	// 合同公告
	state: string

	// 已读
	readed: boolean

	// 创建时间
	created: string

	// 更新时间
	updated: string
}