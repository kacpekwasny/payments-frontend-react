/* eslint-disable react/jsx-one-expression-per-line */

import './PaymentList.scss';
import React from 'react';
import PropTypes from 'prop-types';

import UserPayment from './payment/UserPayment';
import EventPayment from './payment/EventPayment';

const PaymentList = ({
  // type: "history" || "pending"
  username, type, header, payments, onAccept,
}) => (
  <div className="PaymentList">
    <header>{header}</header>
    <ul>
      {payments.map((payment) => {
        if (payment.type === 'UserPayment') {
          return (
            <UserPayment
              key={payment.data.id}
              username={username}
              payment={payment}
              type={type}
              onAccept={onAccept}
            />
          );
        }
        if (payment.type === 'EventPayment') {
          return (
            <EventPayment
              key={payment.data.id}
              username={username}
              payment={payment}
              type={type}
              onAccept={onAccept}
            />
          );
        }
        return (
          <div>
            Error in PaymentList.js!!! payment.type: {JSON.stringify(payment)}
          </div>
        );
      })}
    </ul>
  </div>
);

PaymentList.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  payments: PropTypes.arrayOf.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default PaymentList;
