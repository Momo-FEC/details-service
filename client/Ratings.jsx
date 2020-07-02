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

var Bar = styled.div`
  display: inline-block;
  background-color: ${props => props.fill ? '#FECE30' : '#CACACA'};
  width: ${props => props.width};
  border-radius: ${props => props.fill ? '4px 0 0 4px' : '0 4px 4px 0'};
  height: 12px;
`;

var Line = styled(({ className, index, count, total }) => {
  return (
    <div className={className}>
      {index + 1}
      <Filled />
      <Bar fill={true} width={(count / total * 60).toString() + '%'}/>
      <Bar fill={false} width={((total - count) / total * 60).toString() + '%'}/>
    </div>
  );
})`

`;

var Popup = styled(({ className }) => {
  return (
    <div className={className}>
      <Line index={1} count={4} total={10} />
    </div>
  );
})`
  position: absolute;
  top: 40px;
  width: 270px;
  padding: 5%;
  border: 1px solid black;
  background-color: white;
`;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: true
    };
  }

  handleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    var { className } = this.props;
    return (
      <div className={className}
        onMouseEnter={this.handleHover.bind(this)}
        onMouseLeave={this.handleHover.bind(this)}>
        <Filled /><Filled /><Filled /><Empty /><Empty />
        <Average />
        {this.state.hover && <Popup />}
      </div>
    );
  }
}

export default styled(Ratings)`
  position: relative;
  display: inline-block;
  color: #0077C8;
  font-size: 21px;
`;