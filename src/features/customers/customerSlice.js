/** @format */

const initialStateCutomer = {
	fullname: '',
	nationalID: '',
	createdAt: '',
};

export default function customerReducer(state = initialStateCutomer, action) {
	switch (action.type) {
		case 'customer/createCutomer':
			return {
				...state,
				fullname: action.payload.fullname,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		case 'customer/updateName':
			return {
				...state,
				fullname: action.payload,
			};
		default:
			return state;
	}
}

export function createCutomer(fullname, nationalID) {
	return {
		type: 'customer/createCutomer',
		payload: { fullname, nationalID, createdAt: new Date().toISOString() },
	};
}

export function updateName(fullname) {
	return {
		type: 'customer/updateName',
		payload: fullname,
	};
}
