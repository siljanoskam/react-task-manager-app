import React from 'react';

class Loader extends React.Component {
  render() {
    return <div id="loader" className={`float-right ${this.props.isLoaderHidden ? 'd-none' : ''}`}>
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
