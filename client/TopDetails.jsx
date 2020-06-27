import React from 'react';
import styled from 'styled-components';

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

var ProductCode = styled.div`
  line-height: 240%;
  margin-right: 15px;
  font-size: 10px;
  font-weight: 700;
  color: #a6a6a6;
`;

var Ratings = styled.div`
  display: inline-block;
`;

var Share = styled.div`
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  color #0077C8;
`;

var TopDetails = (props) => {
  return (
    <div id='TopDetails' className={props.className}>
      <Name>{props.name}</Name>
      <Wishlist><img src='https://image-us.samsung.com/SamsungUS/home/store-locator/icon_wishlist_default.svg'></img> Wishlist</Wishlist>
      <div style={{display: 'flex'}}>
        <ProductCode>{props.productCode}</ProductCode>
        <Ratings>rating summary goes here </Ratings>
        <Share> Share your product experience</Share>
      </div>
    </div>
  );
};

export default styled(TopDetails)`
  margin: 0;
  padding: 0;
`;