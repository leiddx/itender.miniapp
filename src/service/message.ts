import Request from './index.js'


import * as Model from '../model.js'


export type ReadParams = {
	limit?: number
	skip?: number
}

export function Read(params: ReadParams) {
	return Request.get<Model.Message[]>(
		'/message', { params }

	)


}



export function Readed(id: string) {
	return Request.put(`/message/${id}`)

}


