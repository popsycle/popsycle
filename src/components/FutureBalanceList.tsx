import * as React from 'react';
import Transaction, { ITransaction } from './Transaction';

interface IProps {
	futureBalances: IFutureBalance[]
}

export interface IFutureBalance {
	amount: number,
	date: number,
	start: number,
	transactions: ITransaction[]
}

class FutureBalanceList extends React.Component<IProps> {
	public render() {
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
					{this.props.futureBalances.map((balance) => {
						return (
							<tr key={balance.date}>
								<td>
									{balance.date}
									<ul className="list-unstyled">
										{balance.transactions.map((transaction, index) => {
											return (
												<li key={index}>
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

export default FutureBalanceList;