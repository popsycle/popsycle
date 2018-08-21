const normalizeDate = date => {
	date.setHours(12, 0, 0, 0);
	return date.getDate();
};

const today = normalizeDate(new Date());

function calculateFutureBalances(currentBalance, futureTransactions, numDays) {
	const futureBalances = [];
	const currentDate = new Date();
	currentDate.setHours(12, 0, 0, 0);
	let balance = currentBalance;

	for (let i = 0; i < numDays; i++) {
		const todaysTransactions = futureTransactions[currentDate.getDate()];
		const start = balance;
		const date = currentDate.toDateString();
		let transactions;

		if (todaysTransactions) {
			balance += todaysTransactions.transactions.reduce((accumulator, currentValue) => {
				return accumulator + currentValue.amount;
			}, 0);
			transactions = todaysTransactions.transactions;
		} else {
			transactions = [];
		}
		futureBalances.push({
			amount: balance,
			date,
			start,
			transactions
		});
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return futureBalances;
}

// FAKE INITIAL DATA -----------------------------------------------------------
const currentBalanceF = 1000;
const futureTransactionsF = { // TODO refactor to use a map of the date strings
	[today+1]: {
		transactions: [{ amount: -100, label: 'new speaker' }]
	},
	[today + 2]: {
		transactions: [{ amount: 300, label: 'sell tv' }, { amount: -15, label: 'Netflix' }]
	},
	[today + 3]: {
		transactions: [{ amount: -10, label: 'Dinner out'}]
	},
	[today + 7]: {
		transactions: [{ amount: -700, label: 'Rent' }]
	},
	[today + 9]: {
		transactions: [{ amount: 1200, label: 'paycheck' }]
	}
};
const initialState = {
	accounts: {
		'omniAccount': {
			currentBalance: currentBalanceF,
			futureBalances: calculateFutureBalances(currentBalanceF, futureTransactionsF, 10),
			futureTransactions: futureTransactionsF,
			pastTransactions: {}
		}
	}
};

export default function ledgerReducer(state = initialState, action) {
	const account = 'omniAccount';

	switch(action.type) {
	case 'ADD_FUTURE_TRANSACTION': {

		const transaction = action.payload;
		const date = normalizeDate(new Date(transaction.date));
		const label = transaction.label;
		let amount = Number(transaction.amount);
		amount = transaction.transactionType === 'income'? amount : -amount;
		const futureTransactions = {...state.accounts[account].futureTransactions};
		if (!futureTransactions[date]) {
			futureTransactions[date] = {
				transactions: []
			};
		}

		futureTransactions[date].transactions.push({
			amount,
			label
		});

		const futureBalances = calculateFutureBalances(state.accounts[account].currentBalance, futureTransactions, 10);

		return {
			...state,
			accounts: {
				...state.accounts,
				[account]: {
					...state.accounts[account],
					futureBalances,
					futureTransactions
				}
			}
		};
	}
	default: 
		return state;
	}
}
