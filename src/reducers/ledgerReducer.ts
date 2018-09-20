import {
	IAccountMap,
	IBalanceMap,
	IFutureBalance,
	IFutureTransactions,
	ILedger,
	ITransaction
} from "./models";

const normalizeDate = (date:Date):Date => {
	date.setHours(12, 0, 0, 0);
	return date;
};

function sumBalances(balances:IBalanceMap):number {
	return Object.values(balances).reduce((accumulator, balance) => {
		return accumulator + balance;
	}, 0);
}

function getCurrentBalances(accountsMap:IAccountMap): IBalanceMap {
	const balanceMap:IBalanceMap = {};
	Object.keys(accountsMap).forEach((accountName) => {
		balanceMap[accountName] = accountsMap[accountName].currentBalance;
	})
	return balanceMap;
}

function calculateFutureBalances(
	currentBalances:IBalanceMap,
	futureTransactions:IFutureTransactions,
	numDays:number
):IFutureBalance[] {
	const futureBalances = [];
	const currentDate = normalizeDate(new Date());
	const balances = {...currentBalances};

	for (let i = 0; i < numDays; i++) {
		const todaysTransactions = futureTransactions[currentDate.toDateString()];
		const startBalances = {...balances};
		const date = currentDate.toDateString();
		let transactions:ITransaction[];

		if (todaysTransactions) {
			todaysTransactions.transactions.forEach((transaction:ITransaction) => {
				balances[transaction.account] += transaction.amount;
			});
			transactions = todaysTransactions.transactions;
		} else {
			transactions = [];
		}
		futureBalances.push({
			amount: sumBalances(balances),
			balances,
			date,
			startAmount: sumBalances(startBalances),
			startBalances,
			transactions,
		});
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return futureBalances;
}

// FAKE INITIAL DATA -----------------------------------------------------------
const today = normalizeDate(new Date()).toDateString();
const futureDate = (dateString:string, daysInFuture: number):string => {
	const dateInFuture = normalizeDate(new Date(dateString));
	dateInFuture.setDate(dateInFuture.getDate() + daysInFuture);
	return dateInFuture.toDateString();
}
const currentBalanceF = 1000;
const currentBalancesF = {
	omniAccount: currentBalanceF
}
const futureTransactionsF:IFutureTransactions = { // TODO refactor to use a map of the date strings
	[today]: {
		transactions: [
			{ amount: -100, account:'omniAccount', label: 'new speaker' }
		]
	},
	[futureDate(today, 2)]: {
		transactions: [
			{ amount: 300, account: 'omniAccount', label: 'sell tv' },
			{ amount: -15, account: 'omniAccount', label: 'Netflix' }
		]
	},
	[futureDate(today, 3)]: {
		transactions: [
			{ amount: -10, account: 'omniAccount', label: 'Dinner out' }
		]
	},
	[futureDate(today, 7)]: {
		transactions: [
			{ amount: -700, account: 'omniAccount', label: 'Rent' }
		]
	},
	[futureDate(today, 9)]: {
		transactions: [
			{ amount: 1200, account: 'omniAccount', label: 'paycheck' }
		]
	}
};
const initialState:ILedger = {
	accounts: {
		'omniAccount': {
			currentBalance: currentBalanceF,
			name: 'omniAccount'
		}
	},
	futureBalances: calculateFutureBalances(currentBalancesF, futureTransactionsF, 10),
	futureTransactions: futureTransactionsF
};

export default function ledgerReducer(state = initialState, action: {type:string, payload:any}) {
	switch(action.type) {
	case 'ADD_FUTURE_TRANSACTION': {

		const transaction = action.payload;
		const date = normalizeDate(new Date(transaction.date)).toDateString();
		const { label, account } = transaction;
		let amount = Number(transaction.amount);
		amount = transaction.transactionType === 'income'? amount : -amount;
		const futureTransactions = {...state.futureTransactions};
		if (!futureTransactions[date]) {
			futureTransactions[date] = {
				transactions: []
			};
		}

		futureTransactions[date].transactions.push({
			account,
			amount,
			label
		});

		const currentBalances = getCurrentBalances(state.accounts);
		const futureBalances = calculateFutureBalances(currentBalances, futureTransactions, 10);

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
