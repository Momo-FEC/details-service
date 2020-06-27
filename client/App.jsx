import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import TopDetails from './TopDetails.jsx';
import Selectors from './Selectors.jsx';
import BottomDetails from './BottomDetails.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.className = props.className;
    this.state = {
      phone: {
        name: 'default phone name',
        productCode: 'product code',
        capacities: [{ size: 'size1' }, { size: 'size2' }],
        carriers: [{ name: 'Verizon' }, { name: 'Sprint' }],
        colors: [{ name: 'Blue' }, { name: 'Red' }]
      }
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3002/phones/9')
      .then((response) => {
        this.setState({ phone: response.data[0] });
      });
  }

  render() {
    var { name, productCode, capacities, carriers, colors } = this.state.phone;
    return (
      <div id='MainDetails' className={this.className}>
        <TopDetails productCode={productCode} name={name} />
        <Selectors capacities={capacities} carriers={carriers} colors={colors} />
        <BottomDetails />
      </div>
    );
  }
}

var StyledApp = styled(App)`
  display: block;
  padding: 1px 4% 0;
  margin-top: 6%;
  position: relative;
  vertical-align: baseline;
`;

ReactDOM.render(React.createElement(StyledApp), document.getElementById('detailsMain'));
export default App;