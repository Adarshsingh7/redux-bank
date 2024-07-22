/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
		},
		withdraw(state, action) {
			state.balance -= action.payload;
		},
		payLoan(state) {
			if (state.loan <= 0) return;

			state.balance -= state.loan;
			state.loanPurpose = '';
			state.loan = 0;
		},
		requestLoan: {
			prepare(amount, purpose) {
				return { payload: { amount, purpose } };
			},
			reducer(state, action) {
				if (state.loan > 0) return;

				state.balance += action.payload.amount;
				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
			},
		},
		convertingCurrency(state) {
			state.isLoading = true;
		},
	},
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
	if (currency === 'USD') return { type: 'account/deposit', payload: amount };
	else
		return async function (dispatch) {
			dispatch({ type: 'account/convertingCurrency' });
			const res = await fetch(
				`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
			);
			const data = await res.json();
			const converted = data.rates.USD;
			dispatch({ type: 'account/deposit', payload: converted });
		};
}

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return {
				...state,
				balance: state.balance + action.payload,
				isLoading: false,
			};
		case 'account/withdraw':
			return { ...state, balance: state.balance - action.payload };
		case 'account/requestLoan':
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
		case 'account/loading':
			return { ...state, isLoading: true };
		default:
			return state;
	}
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
*/
