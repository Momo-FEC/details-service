import React from 'react';
import styled from 'styled-components';

var Image = (props) => {
  if (props.name === 'Unlocked') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/explore/samsung-s8/S8_Unlocked_configurator_v4.png' style={{height: '38px'}}></img>;
  } else if (props.name === 'Verizon') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/b2c/configurator/connectivity-logo/samsung-carriers_280x120_Verizon.png' style={{height: '38px'}}></img>;
  } else if (props.name === 'AT&T') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/b2c/configurator/connectivity-logo/samsung-carriers_280x120_ATT.png' style={{height: '38px'}}></img>;
  } else if (props.name === 'T-Mobile') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/b2c/configurator/connectivity-logo/samsung-carriers_280x120_Tmobile.png' style={{height: '38px'}}></img>;
  } else if (props.name === 'Sprint') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/b2c/configurator/connectivity-logo/samsung-carriers_280x120_Sprint.png' style={{height: '38px'}}></img>;
  } else if (props.name === 'U.S. Cellular') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/b2c/configurator/connectivity-logo/samsung-carriers_280x120_USCellular.png' style={{height: '38px'}}></img>;
  } else if (props.name === 'White') {
    return <img src='https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s20-5g/gallery-cloud-white/PDP-GALLERYS20-white-Lockup-1600x1200.jpg' style={{height: '60px'}}></img>;
  } else if (props.name === 'Cosmic Gray') {
    return <img src='https://image-us.samsung.com/us/smartphones/galaxy-s20/Cosmic-Gray/X1_Lockup_CosmicGray-1600x1200.jpg' style={{height: '60px'}}></img>;
  } else if (props.name === 'Cloud Blue') {
    return <img src='https://image-us.samsung.com/us/smartphones/galaxy-s20/Cloud-Blue/X1_Lockup_CloudBlue-1600x1200.jpg' style={{height: '60px'}}></img>;
  } else if (props.name === 'Cloud Pink') {
    return <img src='https://image-us.samsung.com/us/smartphones/galaxy-s20/Cloud-Pink/X1_Lockup_CloudPink-1600x1200.jpg' style={{height: '60px'}}></img>;
  }
  return null;
};

var Price = styled((props) => {
  if (props.section === 'carrier') {
    return <div className={props.className}>$499.99</div>;
  } else if (props.section === 'capacity') {
    return <div className={props.className}>{props.name}</div>;
  }
  return null;
})`
  margin-left: 10px;
  float: right;
  right: 15px;
  line-height: 1em;
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

var StyledItem = styled.div`
  width: ${props => {
    if (props.name === 'Unlocked') {
      return 'calc(100% - 10px)';
    } else if (props.section === 'color') {
      return 'calc(25% - 10px)';
    } else {
      return 'calc(50% - 10px)';
    }
  }};
  display: flex;
  border: ${(props) => {
    return (props.selected || props.hovered) ? '2px solid #1428a0' : '1px solid #a6a6a6';
  }};
  border-radius: 4px;
  margin: 0 5px 10px 5px;
  padding: 15px 1%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`;

class SelectorItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  handleHover() {
    this.setState({hovered: !this.state.hovered});
  }

  render() {
    var { className, name, section, selected, handleSelect } = this.props;
    return (
      <StyledItem
        hovered={this.state.hovered}
        name={name}
        section={section}
        selected={selected}
        onClick={() => handleSelect(section, name)}
        onMouseEnter={this.handleHover.bind(this)}
        onMouseLeave={this.handleHover.bind(this)}>
        <Image name={name} />
        <Price section={section} name={name} />
      </StyledItem>
    );
  }
}

export default SelectorItem;