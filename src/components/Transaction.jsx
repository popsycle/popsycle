import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Transaction extends Component {
	render() {
		const indicator = this.props.amount > 0 ? '\u2191' : '\u2193';
		const color = this.props.amount > 0 ? 'green' : 'red';
		return (
			<div>
				<span style={{color:color}}>{indicator} ${this.props.amount}</span><span> - {this.props.label}</span>
			</div>
		);
	}
}

Transaction.propTypes = {
	amount: PropTypes.number,
	label: PropTypes.string
};

export default Transaction;
