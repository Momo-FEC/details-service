import React from 'react';
import styled from 'styled-components';

var Star = styled(({ className }) => {
  return (<span className={className}>★</span>);
})`
  color: ${props => props.fill ? '#FECE30' : '#CACACA'};
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
  position: relative;
  top: 2px;
  height: 12px;
  width: ${props => props.width};
  background-color: ${props => props.fill ? '#FECE30' : '#CACACA'};
  border-radius: ${props => props.fill ? '4px 0 0 4px' : '0 4px 4px 0'};
  margin-${props => props.fill ? 'left' : 'right'}: 10px;
`;

var Line = styled(({ className, index, count, total }) => {
  return (
    <div className={className}>
      {index}
      <Star fill={true} />
      <Bar fill={true} width={(count / total * 60).toString() + '%'}/>
      <Bar fill={false} width={((total - count) / total * 60).toString() + '%'}/>
      {count}
    </div>
  );
})`
  height: 25px;
  font-size: 13px;
`;

var ReadReviews = styled(({ className, total }) => {
  return (
    <button className={className}>READ {total} REVIEWS</button>
  );
})`
  color: red;
`;

var Popup = styled(({ className }) => {
  var ratings = [2, 3, 4, 4, 2];
  var total = ratings.reduce((x, y) => x + y);
  return (
    <div className={className}>
      {ratings.map((rating, index) => {
        return (
          <Line key={index} index={5 - index} count={rating} total={total} />
        );
      })}
      <ReadReviews total={total} />
    </div>
  );
})`
  position: absolute;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  top: 40px;
  width: 270px;
  padding: 5%;
  border: 1px solid black;
  color: black;
  text-align: center;
  background-color: white;
`;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
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
        <Star fill={true} /><Star fill={true} /><Star fill={true} />
        <Star fill={false} /><Star fill={false} />
        <Average />
        <Popup visible={this.state.hover} />
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