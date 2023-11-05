import React from 'react';

class ThrowError extends React.Component {


  state = {
    err: false
  }


  handleClick = () => {
    this.setState({ err: true });    
  };

  render() {

    if (this.state.err) {
      console.log('clicker + err' + this.state.err);
      throw new Error('clicker by button throw error ');
    }

    return (
      <button onClick={this.handleClick}>
        Throw error!
      </button>
    );
  }
}

export default ThrowError;