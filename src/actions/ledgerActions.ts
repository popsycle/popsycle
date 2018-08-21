export function addFutureTransaction(payload) {
	return {
		payload,
		type: 'ADD_FUTURE_TRANSACTION'
	};
}
