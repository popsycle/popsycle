import React, { Component } from 'react';
import FutureBalanceList from './FutureBalanceList';
import FutureTransactionForm from './FutureTransactionForm';
import PropTypes from 'prop-types';


class FutureBalanceContainer extends Component {
	constructor(props) {
		super(props);
		let today = new Date();
		today.setHours(12, 0, 0, 0);
		today = today.getDate();
		this.state = { // TODO refactor to use a map of the date strings
			futureTransactions: {
				[today]: {
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
			},
			futureBalances: []
		};

		this.onAddFutureTransaction = this.onAddFutureTransaction.bind(this);
	}

	calculateFutureBalances(numDays) {
		const futureBalances = [];
		let currentBalance = this.props.currentBalance;
		let currentDate = new Date();
		currentDate.setHours(12, 0, 0, 0);

		for (let i = 0; i < numDays; i++) {
			const todaysTransactions = this.state.futureTransactions[currentDate.getDate()];
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

		this.setState({
			futureBalances
		});
	}

	onAddFutureTransaction(transaction) {
		let date = new Date(transaction.date);
		date.setHours(12, 0, 0, 0);
		date = date.getDate();
		let amount = Number(transaction.amount);
		amount = transaction.transactionType === 'income'? amount : -amount;
		const futureTransactions = {...this.state.futureTransactions};
		if (!futureTransactions[date]) {
			futureTransactions[date] = {
				transactions: []
			};
		}

		futureTransactions[date].transactions.push({
			amount
		});

		this.setState({futureTransactions});
		this.calculateFutureBalances(10);
	}

	componentDidMount() {
		// TODO remove this
		this.calculateFutureBalances(10);
	}

	render() {
		return (
			<div>
				<h3>Future Balance Estimator</h3>
				<p>{this.props.currentBalance !== undefined ? `Current Balance: $${this.props.currentBalance}` : 'input a balance'}</p>
				<h5>Add Transaction</h5>
				<FutureTransactionForm onAddTransaction={this.onAddFutureTransaction}/>
				<h5>Future Balances</h5>
				<FutureBalanceList futureBalances={this.state.futureBalances}/>
			</div>
		);
	}
}

FutureBalanceContainer.propTypes = {
	currentBalance: PropTypes.number
};

export default FutureBalanceContainer;
