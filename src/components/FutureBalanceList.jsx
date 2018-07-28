import React, { Component } from 'react';

class FutureBalanceList extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {this.props.futureBalances.map((balance, index) => {
            return (
              <tr key={index}>
                <td>{balance.date}</td>
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
