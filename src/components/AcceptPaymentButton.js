import React from 'react';
import PropTypes from 'prop-types';
import './AcceptPaymentButton.scss';

const AcceptPaymentButton = ({ onAccept, payment, accepted }) => (
  <div className="AcceptPaymentButton">
    <p>
      <button
        className={`AcceptPaymentButton ${accepted ? 'cancel-payment' : 'accept-payment'}`}
        type="button"
        onClick={() => onAccept(payment, !accepted)}
      >
        {accepted ? 'Cancel accept' : 'Accept payment' }
      </button>
    </p>
  </div>
);

export default AcceptPaymentButton;

AcceptPaymentButton.propTypes = {
  onAccept: PropTypes.string.isRequired,
  payment: PropTypes.objectOf.isRequired,
  accepted: PropTypes.func.isRequired,
};
