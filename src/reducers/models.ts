
export interface INewTransaction {
	amount: string,
	date: string,
	label: string,
	transactionType: string // TODO make enum
}

export interface ITransaction {
	amount: number,
	label: string
}
export interface IFutureTransactions {
	[property:number]: {
		transactions: ITransaction[]
	}
}

export interface IFutureBalance {
	amount: number,
	date: number,
	start: number,
	transactions: ITransaction[]
}


