const initialState = {
	id: 1,
	name: 'eric'
};

export default function userReducer(state = initialState, action:{type:string, payload:any}) {
	switch (action) {
	default:
		return state;
	}
}
