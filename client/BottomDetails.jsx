import React from 'react';
import styled from 'styled-components';

var BuyBack = styled.div`
  padding: 15px 15px;
  text-align: left;
`;

var From = styled.div`
  font-size: 20px;
`;

var Big = styled.span`
  font-size: 26px;
`;

var Or = styled.div`
  display: inline-block;
  margin: 4% auto;
  color: #363636;
`;

var Line = styled.div`
  display: inline-block;
  border: 1px solid #dadada;
  margin: 0 15px;
  width: 30%;
  vertical-align: middle;
`;

var Divider = () => (<><Line /><Or>OR</Or><Line /></>);

var BuyNow = styled.button`
  cursor: pointer;
  margin-top: 10px;
  padding: 20px 38px 20px 40px;
  width: 100%;
  background-color: #1428a0;
  border-radius: 40px;
  letter-spacing: .25em;
  font-weight: 700;
  text-align: center;
  color: #fff;
`;

var BottomDetails = ({ className }) => {
  return (
    <div className={className}>
      <BuyBack>Guaranteed buy-back program: Get a credit worth 50% of the retail price of the product you purchanse when you return the device in good condition within 24 months.</BuyBack>
      <From>From <Big>$499.99</Big></From>
      <Divider />
      <div>From <Big>$13.89</Big>/mo for <Big>36</Big> mos at<Big> 0% </Big>APR</div>
      <div>excludes tax and shipping</div>
      <Divider />
      <img src="https://image-us.samsung.com/SamsungUS/home/mobile/daas/samsung-access-wordmark-black-rgb-wide.png"></img>
      <div>Subscribe and get this phone with Premium Care and workplace apps.</div>
      <From>From <Big>$37/mo</Big></From>
      <BuyNow>BUY NOW</BuyNow>
    </div>
  );
};

export default styled(BottomDetails)`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
`;