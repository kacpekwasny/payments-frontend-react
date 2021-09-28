import React from 'react';
import PropTypes from 'prop-types';
import NewEventPayment from './NewEventPayment';
import NewUserPayment from './NewUserPayment';
import './NewPayment.scss';

const NewPayment = ({ userList, addUserPayment, addEventPayment }) => (
  <div className="NewPayment">
    <div className="white-window">
      <div className="payment new-user-payment">
        <p className="chose-payment">User Payment</p>
        <div className="in-shadow-section">
          <NewUserPayment userList={userList} addUserPayment={addUserPayment} />
        </div>
      </div>
      <div className="payment new-event-payment">
        <p className="chose-payment">Event Payment</p>
        <div className="in-shadow-section">
          <NewEventPayment userList={userList} addEventPayment={addEventPayment} />
        </div>
      </div>
    </div>
  </div>
);

export default NewPayment;

NewPayment.propTypes = {
  userList: PropTypes.arrayOf.isRequired,
  addUserPayment: PropTypes.func.isRequired,
  addEventPayment: PropTypes.func.isRequired,
};
