import React from 'react';
import styled from 'styled-components';

var Filled = styled(({ className }) => {
  return (<span className={className}>★</span>);
})`
  color: #FECE30;
`;

var Empty = styled(({ className }) => {
  return (<span className={className}>★</span>);
})`
  color: #CACACA;
`;

var Average = styled(({ className }) => {
  return (<span className={className}>2.9 (23)</span>);
})`
  align-items: center;
  vertical-align: middle;
  margin: 0 10px;
  font-size: 13px;
`;

var Ratings = ({ className }) => {
  return (
    <div className={className}>
      <Filled /><Filled /><Filled /><Empty /><Empty />
      <Average />
    </div>
  );
};

export default styled(Ratings)`
  display: inline-block;
  color: #0077C8;
  font-size: 21px;
`;