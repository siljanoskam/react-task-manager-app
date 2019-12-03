import React from 'react';
import '../Loader.css';

class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.updateLoaderVisibility = this.updateLoaderVisibility.bind(this);
  }

  updateLoaderVisibility(status) {
    this.setState({visible: status});
  };

  render() {
    return <div id="loader" className={`float-right ${!this.state.visible ? 'd-none' : ''}`}>
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
