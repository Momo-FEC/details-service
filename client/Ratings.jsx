import React from 'react';
import styled from 'styled-components';

var Ratings = ({ className }) => {
  return (
    <div className={className}>
      rating summary goes here
    </div>
  );
};

export default styled(Ratings)`
  display: inline-block;
`;