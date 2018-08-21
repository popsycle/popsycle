import { INewTransaction } from "../reducers/models";

export function addFutureTransaction(payload:INewTransaction) {
	return {
		payload,
		type: 'ADD_FUTURE_TRANSACTION'
	};
}
