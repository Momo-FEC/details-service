import React from 'react';
import styled from 'styled-components';
import SelectorItem from './SelectorItem.jsx';

var Title = styled.div`
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 5px;
  font-weight: 700;
  color: #363636;
  letter-spacing: 1px;
`;

var Selector = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Selectors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carrier: props.carriers[0].name,
      capacity: props.capacities[0].size,
      color: props.colors[0].name
    };
  }

  handleSelect(section, name) {
    var temp = {};
    temp[section] = name;
    this.setState(temp);
  }

  render() {
    var { className, carriers, capacities, colors } = this.props;

    return (
      <div id='Selectors' className={className}>
        <Title>CARRIER</Title>
        <Selector>
          {carriers.map((carrier, index) => {
            return <SelectorItem
              key={index}
              name={carrier.name}
              section='carrier'
              handleSelect={this.handleSelect.bind(this)}
              selected={carrier.name === this.state.carrier}/>;
          })}
        </Selector>
        <Title>CAPACITY</Title>
        <Selector>
          {capacities.map((capacity, index) => {
            return <SelectorItem
              key={index}
              name={capacity.size}
              section='capacity'
              handleSelect={this.handleSelect.bind(this)}
              selected={capacity.size === this.state.capacity}/>;
          })}
        </Selector>
        <Title>COLOR</Title>
        <Selector>
          {colors.map((color, index) => {
            return <SelectorItem
              key={index}
              name={color.name}
              section='color'
              handleSelect={this.handleSelect.bind(this)}
              selected={color.name === this.state.color}/>;
          })}
        </Selector>
      </div>
    );
  }
}

export default Selectors;