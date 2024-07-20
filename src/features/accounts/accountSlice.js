/** @format */

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

export default function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return { ...state, balance: state.balance + action.payload };
		case 'account/withdraw':
			return { ...state, balance: state.balance - action.payload };
		case 'account/loan':
			if (state.loan > 0) return state;
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};

		case 'account/payLoan':
			return {
				...state,
				loan: 0,
				loanPurpose: '',
				balance: state.balance - state.loan,
			};
		default:
			return state;
	}
}

export function deposit(amount) {
	return { type: 'account/deposit', payload: amount };
}

export function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(purpose, amount) {
	return { type: 'account/requestLoan', payload: { amount, purpose } };
}

export function payLoan() {
	return { type: 'account/payLoan' };
}
