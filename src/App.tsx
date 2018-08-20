import * as React from 'react';
import FutureBalanceContainer from './components/FutureBalanceContainer';
import PopsycleNavbar from './components/PopsycleNavbar';
import './styles/app.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <PopsycleNavbar />

        <main className="container">
          <p>
            Welcome to Popsycle
					</p>
          <FutureBalanceContainer />
        </main>
      </div>
    );
  }
}

export default App;
