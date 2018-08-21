import * as React from 'react';
import { IFutureBalance } from '../reducers/models';
import Transaction from './Transaction';

interface IProps {
	futureBalances: IFutureBalance[]
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
