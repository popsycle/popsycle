const normalizeDate = date => {
	date.setHours(12, 0, 0, 0);
	return date.getDate();
};

const today = normalizeDate(new Date());

function calculateFutureBalances(currentBalance, futureTransactions, numDays, ) {
	const futureBalances = [];
	let currentDate = new Date();
	currentDate.setHours(12, 0, 0, 0);

	for (let i = 0; i < numDays; i++) {
		const todaysTransactions = futureTransactions[currentDate.getDate()];
		if (todaysTransactions) {
			currentBalance += todaysTransactions.transactions.reduce((accumulator, currentValue) => {
				return accumulator + currentValue.amount;
			}, 0);
			futureBalances.push({
				date: currentDate.toDateString(),
				amount: currentBalance,
				transactions: todaysTransactions.transactions
			});
		} else {
			futureBalances.push({
				date: currentDate.toDateString(),
				amount: currentBalance,
				transactions: []
			});
		}
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return futureBalances;
}

// FAKE INITIAL DATA -----------------------------------------------------------
const currentBalance = 1000;
const futureTransactions = { // TODO refactor to use a map of the date strings
	[today+1]: {
		transactions: [{ amount: -100 }]
	},
	[today + 2]: {
		transactions: [{ amount: 300 }, { amount: -15 }]
	},
	[today + 3]: {
		transactions: [{ amount: -10 }]
	},
	[today + 7]: {
		transactions: [{ amount: -700 }]
	},
	[today + 9]: {
		transactions: [{ amount: 1200 }]
	}
};
const initialState = {
	accounts: {
		'omniAccount': {
			currentBalance,
			pastTransactions: {},
			futureTransactions,
			futureBalances: calculateFutureBalances(currentBalance, futureTransactions, 10)
		}
	}
};

export default function ledgerReducer(state = initialState, action) {
	const account = 'omniAccount';

	switch(action.type) {
	case 'ADD_FUTURE_TRANSACTION': {

		const transaction = action.payload;
		const date = normalizeDate(new Date(transaction.date));
		let amount = Number(transaction.amount);
		amount = transaction.transactionType === 'income'? amount : -amount;
		const futureTransactions = {...state.accounts[account].futureTransactions};
		if (!futureTransactions[date]) {
			futureTransactions[date] = {
				transactions: []
			};
		}

		futureTransactions[date].transactions.push({
			amount
		});

		const futureBalances = calculateFutureBalances(state.accounts[account].currentBalance, futureTransactions, 10);

		return {
			...state,
			accounts: {
				...state.accounts,
				[account]: {
					...state.accounts[account],
					futureTransactions,
					futureBalances
				}
			}
		};
	}
	default: 
		return state;
	}
}