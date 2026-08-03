import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { toastSelectors } from 'state-management/modules/rootSelector';

import './Toast.scss';
import spinner from 'public/images/spinner.gif';

const Toast = (props) => (
  <React.Fragment>
    {props.messages.length > 0 && (
      <div className="toast-wrapper">
        {props.messages.map((message) => (
          <div className="toast-message" key={message.id}>
            <div className="icon-div">
              <img
                src={spinner}
                className="progress__indicator"
                alt="Loading"
                tabIndex="-1"
              />
            </div>

            <div className="wait-message">
              {message.text}
            </div>
          </div>
        ))}
      </div>
    )}
  </React.Fragment>
);

Toast.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  messages: toastSelectors.getMessages(state),
});

export default connect(mapStateToProps, null)(Toast);