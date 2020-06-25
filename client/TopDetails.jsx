import React from 'react';
import styled from 'styled-components';

var Name = styled.div`
  display: inline-block;
  margin: 0;
  line-height: 160%;
  font-family: 'Arial';
  font-size: 20px;
  font-weight: 700;
  color: #363636;
  max-width: calc(100% - 80px);
`;

var Wishlist = styled.div`
  display: inline-block;
  line-height: 32px;
  float: right;
  font-size: 12px;
  font-weight: bold;
  color: #1428a0;
`;

var TopDetails = (props) => {
  return (
    <div id='TopDetails' className={props.className}>
      <Name>{props.name}</Name>
      <Wishlist><img src='https://image-us.samsung.com/SamsungUS/home/store-locator/icon_wishlist_default.svg'></img> Wishlist</Wishlist>
      <div>{props.productCode}</div>
    </div>
  );
};

export default styled(TopDetails)`
  margin: 0;
  padding: 0;
  border: 1px solid red;
  width: 40%;
  color: blue;
`;