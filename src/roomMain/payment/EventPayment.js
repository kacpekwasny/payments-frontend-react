/* eslint-disable react/jsx-one-expression-per-line */

import './Payment.scss';
import React from 'react';
import PropTypes from 'prop-types';
import AcceptPaymentButton from '../../components/AcceptPaymentButton';

const EventPayment = ({
  username, payment, type, onAccept,
}) => {
  const { data } = payment;
  if (type === 'history') {
    return (
      <li className={`EventPayment Payment Border ${payment.newlyAccepted === undefined ? '' : 'newly-accepted'}`}>
        <div className="users-ammount-eventpay">
          {Object.entries(data.ammounts).map(([user, ammount]) => (
            <p key={user} className="user">
              {user} : {ammount.toFixed(2)}
            </p>
          ))}
        </div>
        <div className="title-eventpay">
          <p>Title: {data.title}</p>
        </div>
        <div className="date-eventpay">
          <p>Date : {data.created}</p>
        </div>
      </li>
    );
  }
  if (type === 'pending') {
    const accepted = data.accepted.includes(username);
    return (
      <li className="EventPayment Border">
        <div className="Payment">
          <div className="users-ammount-eventpay">
            {Object.entries(data.ammounts).map(([user, ammount]) => (
              <p key={user} className="user">
                {data.accepted.includes(user) ? <span className="grn">✔</span> : <span className="red">🗙</span>}
                {` ${user}`} : {ammount.toFixed(2)}
              </p>
            ))}
          </div>
          <div className="title-eventpay">
            <p>Title: {data.title}</p>
          </div>
          <div className="date-eventpay">
            <p>Date: {data.created}</p>
          </div>
        </div>
        {(data.waiting.includes(username) || data.accepted.includes(username))
        && <AcceptPaymentButton onAccept={onAccept} accepted={accepted} payment={payment} />}
      </li>
    );
  }
  return <div>Error in EventPayment.js!!!</div>;
};

EventPayment.propTypes = {
  username: PropTypes.string.isRequired,
  payment: PropTypes.objectOf.isRequired,
  type: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default EventPayment;
