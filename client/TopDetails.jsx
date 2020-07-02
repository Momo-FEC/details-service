import React from 'react';
import styled from 'styled-components';
import Ratings from './Ratings.jsx';

var Name = styled.div`
  display: inline-block;
  line-height: 160%;
  max-width: calc(100% - 80px);
  font-size: 20px;
  font-weight: 700;
  color: #363636;
`;

var Wishlist = styled.div`
  cursor: pointer;
  display: inline-block;
  line-height: 32px;
  float: right;
  font-size: 12px;
  font-weight: 700;
  color: #1428a0;
`;

var ProductCode = styled.span`
  line-height: 240%;
  margin-right: 15px;
  font-size: 10px;
  font-weight: 700;
  color: #a6a6a6;
`;

var Share = styled.span`
  cursor: pointer;
  font-size: 12px;
  color #0077C8;
`;

var TopDetails = ({ className, name, productCode }) => {
  return (
    <div id='TopDetails' className={className}>
      <Name>{name}</Name>
      <Wishlist><img src='https://image-us.samsung.com/SamsungUS/home/store-locator/icon_wishlist_default.svg'></img> Wishlist</Wishlist>
      <div>
        <ProductCode>{productCode}</ProductCode>
        <Ratings />
        <Share> Share your product experience</Share>
      </div>
    </div>
  );
};

export default styled(TopDetails)`
  margin: 0 0 10px 0;
  padding: 0;
  vertical-align: middle;
`;