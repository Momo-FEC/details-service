import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import TopDetails from './TopDetails.jsx';
import Selectors from './Selectors.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null
    };
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:3002/phones${window.location.pathname}`)
      .then((response) => {
        this.setState({ phone: response.data[0] });
      });
  }

  render() {
    if (this.state.phone === null) {
      return <div>There was an error retrieving the phone information.</div>;
    }
    var { className } = this.props;
    var { name, productCode, capacities, carriers, colors } = this.state.phone;
    return (
      <div id='MainDetails' className={className}>
        <TopDetails productCode={productCode} name={name} />
        <Selectors capacities={capacities} carriers={carriers} colors={colors} />
      </div>
    );
  }
}

var StyledApp = styled(App)`
  padding: 1px 4% 0;
  margin-top: 6%;
  font-family: Arial;
`;

ReactDOM.render(React.createElement(StyledApp), document.getElementById('detailsMain'));