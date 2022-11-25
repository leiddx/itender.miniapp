import Request from './index.js'


import * as Model from '../model.js'


export type ReadParams = {
	keyword?: string
	category?: string
	limit?: number
	skip?: number
}


export function Read(params: ReadParams) {
	return Request.get<Model.Poster[]>(
		'/poster', { params }

	)


}

export function Dateil(id: string) {
	return Request.get<Model.Poster>(
		`/poster/${id}`

	)


}

export function Subscribe(id: string) {
	return Request.post(
		`/poster/${id}/notice`

	)


}

export function UnSubscribe(id: string) {
	return Request.delete(
		`/poster/${id}/notice`

	)


}