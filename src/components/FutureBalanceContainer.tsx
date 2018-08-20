import * as React from 'react';
import { connect } from 'react-redux';
import { addFutureTransaction } from '../actions/ledgerActions.js';
import FutureBalanceList, { IFutureBalance } from './FutureBalanceList';
import FutureTransactionForm from './FutureTransactionForm';
import { ITransaction } from './Transaction';

interface IProps {
	currentBalance: number,
	futureBalances:IFutureBalance[]
	addFutureTransaction(transaction: ITransaction):void,
}

class FutureBalanceContainer extends React.Component<IProps> {
	public render() {
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

const account = 'omniAccount';
const mapStateToProps = state => ({
	currentBalance: state.ledger.accounts[account].currentBalance,
	futureBalances: state.ledger.accounts[account].futureBalances,
	futureTransactions: state.ledger.accounts[account].futureTransactions
});

const mapDispatchToProps = dispatch => ({
	addFutureTransaction: (payload) => dispatch(addFutureTransaction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureBalanceContainer);
