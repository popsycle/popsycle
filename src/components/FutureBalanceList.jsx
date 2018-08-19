import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transaction from './Transaction';

class FutureBalanceList extends Component {
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Starting Balance</th>
						<th>Ending Balance</th>
					</tr>
				</thead>
				<tbody>
					{this.props.futureBalances.map((balance, index) => {
						return (
							<tr key={index}>
								<td>
									{balance.date}
									<ul className="list-unstyled">
										{balance.transactions.map((transaction) => {
											return (
												<li>
													<Transaction {...transaction}/>
												</li>
											);
										})}
									</ul>
								</td>
								<td>${balance.start}</td>
								<td>${balance.amount}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

FutureBalanceList.propTypes = {
	futureBalances: PropTypes.array
};

export default FutureBalanceList;
