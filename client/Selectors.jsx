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

var Selectors = (props) => {
  return (
    <div id='Selectors' className={props.className}>
      <Title>CARRIER</Title>
      <Selector>
        {props.carriers.map((carrier) => {
          return <SelectorItem key={carrier.name} name={carrier.name} section='carrier'/>;
        })}
      </Selector>
      <Title>CAPACITY</Title>
      <Selector>
        {props.capacities.map((capacity) => {
          return <SelectorItem key={capacity.size} name={capacity.size} section='capacity'/>;
        })}
      </Selector>
      <Title>COLOR</Title>
      <Selector>
        {props.colors.map((color) => {
          return <SelectorItem key={color.name} name={color.name} section='color'/>;
        })}
      </Selector>
    </div>
  );
};

export default Selectors;