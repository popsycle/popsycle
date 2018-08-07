import React, { Component } from 'react';
import PopsycleNavbar from './components/PopsycleNavbar';
import FutureBalanceContainer from './components/FutureBalanceContainer';
import './styles/app.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<PopsycleNavbar/>

				<main className="container">
					<p>
						Welcome to Popsycle
					</p>
					<FutureBalanceContainer currentBalance={1000}/>
				</main>
			</div>
		);
	}
}

export default App;
