import PropTypes from 'prop-types';
import React from 'react';
import PaymentList from './PaymentList';

import './MainRoom.scss';

const MainRoom = ({
  username, historyPayments, pendingPayments, onAccept,
}) => (
  <div className="MainRoom">
    <PaymentList type="history" header="History" payments={historyPayments} />
    <PaymentList type="pending" header="Pending" payments={pendingPayments} username={username} onAccept={onAccept} />
  </div>
);

MainRoom.propTypes = {
  username: PropTypes.string.isRequired,
  historyPayments: PropTypes.arrayOf.isRequired,
  pendingPayments: PropTypes.arrayOf.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default MainRoom;
