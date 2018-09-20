import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addFutureTransaction } from '../actions/ledgerActions';
import { IFutureBalance, ILedger, INewTransaction } from '../reducers/models';
import FutureBalanceList from './FutureBalanceList';
import FutureTransactionForm from './FutureTransactionForm';

interface IProps {
	currentBalance: number,
	futureBalances: IFutureBalance[]
	addFutureTransaction(transaction:INewTransaction):void,
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
const mapStateToProps = ({ ledger }:{ ledger:ILedger }) => ({
	currentBalance: ledger.accounts[account].currentBalance,
	futureBalances: ledger.futureBalances,
	futureTransactions: ledger.futureTransactions
});

const mapDispatchToProps = (dispatch:Dispatch) => ({
	addFutureTransaction: (payload:any) => dispatch(addFutureTransaction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureBalanceContainer);
