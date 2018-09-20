
export interface INewTransaction {
	account: string,
	amount: string,
	date: string,
	label: string,
	transactionType: string // TODO make enum
}

export interface ITransaction {
	amount: number,
	account: string,
	label: string
}
export interface IFutureTransactions {
	[property:number]: {
		transactions: ITransaction[]
	}
}

export interface IBalanceMap {
	[accountName:string]: number
}

export interface IFutureBalance {
	amount: number,
	balances: IBalanceMap,
	date: string,
	startAmount: number,
	startBalances: IBalanceMap,
	transactions: ITransaction[]
}

export interface IAccount {
	name: string,
	currentBalance: number
}

export interface IAccountMap {
	[accountName:string]: IAccount
}

export interface ILedger {
	accounts: IAccountMap,
	futureBalances: IFutureBalance[],
	futureTransactions: IFutureTransactions
}
