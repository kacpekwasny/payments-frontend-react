/* eslint-disable react/jsx-one-expression-per-line */

import './Payment.scss';
import PropTypes from 'prop-types';
import React from 'react';
import AcceptPaymentButton from '../../components/AcceptPaymentButton';

const UserPayment = ({
  username, payment, type, onAccept,
}) => {
  const { data } = payment;
  if (type === 'history') {
    return (
      <li className={`UserPayment Payment Border ${payment.newlyAccepted === undefined ? '' : 'newly-accepted'}`}>
        <div className="from-to-userpay">
          <p className="user"> From: {data.from_username} </p>
          <p className="user"> To: {data.to_username}</p>
        </div>
        <div className="title-userpay">
          <p>Title: {data.title}</p>
        </div>
        <div className="amount-date-userpay">
          <p>Amount: {data.ammount}</p>
          <p>Date: {data.created}</p>
        </div>
      </li>
    );
  }
  if (type === 'pending') {
    const accepted = data.accepted.includes(username);
    return (
      <li className="UserPayment Border">
        <div className="Payment">
          <div className="from-to-userpay">
            <p className="user">
              {data.accepted.includes(data.from_username) ? <span className="grn">✔</span> : <span className="red">🗙</span>}
              &nbsp;From:&nbsp;
              {data.from_username}
            </p>
            <p className="user">
              {data.accepted.includes(data.to_username) ? <span className="grn">✔</span> : <span className="red">🗙</span>}
              &nbsp;To:&nbsp;
              {data.to_username}
            </p>
          </div>
          <div className="title-userpay">
            <p>
              Title:&nbsp;
              {data.title}
            </p>
          </div>
          <div className="amount-date-userpay">
            <p>
              Amount:&nbsp;
              {data.ammount}
            </p>
            <p>
              Date:&nbsp;
              {data.created}
            </p>
          </div>
        </div>
        {(data.waiting.includes(username) || data.accepted.includes(username))
        && <AcceptPaymentButton onAccept={onAccept} accepted={accepted} payment={payment} />}
      </li>
    );
  }
  return <div>Error in UserPayment.js!!!</div>;
};

UserPayment.propTypes = {
  username: PropTypes.string.isRequired,
  payment: PropTypes.objectOf.isRequired,
  type: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default UserPayment;
