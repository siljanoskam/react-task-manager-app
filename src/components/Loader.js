import React from 'react';
import '../Loader.css';

class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false
    };

    this.updateLoaderStatus = this.updateLoaderStatus.bind(this);
  }

  updateLoaderStatus(status) {
    this.setState({status: status});
  };

  render() {
    return <div id="loader" className={`float-right ${!this.state.status ? 'd-none' : ''}`}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Please wait...</p>
    </div>
  }
}

export default Loader;
