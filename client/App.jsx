import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>Hey there</div>
    )
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('detailsMain'))

export default App;