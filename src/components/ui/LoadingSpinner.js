import React from 'react';
import ReactDOM from 'react-dom';

import '../../styles/LoadingSpinner.css';


const Loading = props => {
  const content = (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('spinner-hook'));
}
const LoadingSpinner = props => {
  return <Loading {...props}></Loading>
};

export default LoadingSpinner;
