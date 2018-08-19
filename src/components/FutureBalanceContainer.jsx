import React, { Component } from 'react';
import { connect } from 'react-redux';
import FutureBalanceList from './FutureBalanceList';
import FutureTransactionForm from './FutureTransactionForm';
import PropTypes from 'prop-types';
import { addFutureTransaction } from '../actions/ledgerActions.js';


class FutureBalanceContainer extends Component {
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
