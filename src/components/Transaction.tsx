import * as React from 'react';

export interface ITransaction {
	amount: number,
	label: string
}

class Transaction extends React.Component<ITransaction> {
	public render() {
		const indicator = this.props.amount > 0 ? '\u2191' : '\u2193';
		const color = this.props.amount > 0 ? 'green' : 'red';
		return (
			<div>
				<span style={{color}}>{indicator} ${this.props.amount}</span><span> - {this.props.label}</span>
			</div>
		);
	}
}

export default Transaction;
