import React, { Component } from 'react';
import { connect } from 'react-redux';
import FutureBalanceList from './FutureBalanceList';
import FutureTransactionForm from './FutureTransactionForm';
import PropTypes from 'prop-types';
import { addFutureTransaction } from '../actions/ledgerActions.js';


class FutureBalanceContainer extends Component {
	constructor(props) {
		super(props);
		// this.onAddFutureTransaction = this.onAddFutureTransaction.bind(this);
	}

	// calculateFutureBalances(numDays) {
	// 	const futureBalances = [];
	// 	let currentBalance = this.props.currentBalance;
	// 	let currentDate = new Date();
	// 	currentDate.setHours(12, 0, 0, 0);

	// 	for (let i = 0; i < numDays; i++) {
	// 		const todaysTransactions = this.state.futureTransactions[currentDate.getDate()];
	// 		if (todaysTransactions) {
	// 			currentBalance += todaysTransactions.transactions.reduce((accumulator, currentValue) => {
	// 				return accumulator + currentValue.amount;
	// 			}, 0);
	// 			futureBalances.push({
	// 				date: currentDate.toDateString(),
	// 				amount: currentBalance,
	// 				transactions: todaysTransactions.transactions
	// 			});
	// 		} else {
	// 			futureBalances.push({
	// 				date: currentDate.toDateString(),
	// 				amount: currentBalance,
	// 				transactions: []
	// 			});
	// 		}
	// 		currentDate.setDate(currentDate.getDate() + 1);
	// 	}

	// 	this.setState({
	// 		futureBalances
	// 	});
	// }

	// onAddFutureTransaction(transaction) {
	// 	let date = new Date(transaction.date);
	// 	date.setHours(12, 0, 0, 0);
	// 	date = date.getDate();
	// 	let amount = Number(transaction.amount);
	// 	amount = transaction.transactionType === 'income'? amount : -amount;
	// 	const futureTransactions = {...this.state.futureTransactions};
	// 	if (!futureTransactions[date]) {
	// 		futureTransactions[date] = {
	// 			transactions: []
	// 		};
	// 	}

	// 	futureTransactions[date].transactions.push({
	// 		amount
	// 	});

	// 	this.setState({futureTransactions});
	// 	this.calculateFutureBalances(10);
	// }

	componentDidMount() {
		// TODO remove this
		// this.calculateFutureBalances(10);
	}

	render() {
		return (
			<div>
				<h3>Future Balance Estimator</h3>
				<p>{this.props.currentBalance !== undefined ? `Current Balance: $${this.props.currentBalance}` : 'input a balance'}</p>
				<h5>Add Transaction</h5>
				<FutureTransactionForm onAddTransaction={this.props.addFutureTransaction}/>
				<h5>Future Balances</h5>
				<FutureBalanceList futureBalances={this.props.futureBalances}/>
			</div>
		);
	}
}

FutureBalanceContainer.propTypes = {
	currentBalance: PropTypes.number,
	futureBalances: PropTypes.array,
	addFutureTransaction: PropTypes.func
};

const mapStateToProps = state => ({
	currentBalance: state.ledger.accounts['omniAccount'].currentBalance,
	futureBalances: state.ledger.accounts['omniAccount'].futureBalances,
	futureTransactions: state.ledger.accounts['omniAccount'].futureTransactions
});

const mapDispatchToProps = dispatch => ({
	addFutureTransaction: (payload) => dispatch(addFutureTransaction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureBalanceContainer);
