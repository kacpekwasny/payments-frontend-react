import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function handleBlur(ammount, setAmmount) {
  const num = parseFloat(ammount);
  const cleanNum = num.toFixed(2);
  setAmmount(cleanNum);
}

const NewUserPayment = ({ userList, addUserPayment }) => {
  const [title, setTitle] = useState('');
  const [from, setFrom] = useState(userList[0]);
  const [to, setTo] = useState(userList[0]);
  const [ammount, setAmmount] = useState(0);

  function resetAfterSuccess(titleIn, fromIn, toIn, ammountIn) {
    addUserPayment(titleIn, fromIn, toIn, ammountIn).then((success) => {
      if (success) {
        setTitle('');
        setFrom('');
        setTo(userList[0]);
        setAmmount(0);
      }
    });
  }

  return (
    <div className="NewUserPayment">
      <input
        type="text"
        className="newPay-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="newPay-input ftLabel" htmlFor="NewUserPayment-from-select">
        Select user from.
        <select
          onChange={(e) => setFrom(e.target.value)}
          name=""
          id="NewUserPayment-to-select"
          aria-label="Select to"
          value={from}
        >
          {userList.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </label>
      <label className="newPay-input ftLabel" htmlFor="NewUserPayment-to-select">
        Select user to.
        <select
          onChange={(e) => setTo(e.target.value)}
          name=""
          id="NewUserPayment-to-select"
          aria-label="Select to"
          value={to}
        >
          {userList.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </label>
      <input
        type="number"
        className="newPay-input"
        value={ammount}
        onChange={(e) => setAmmount(e.target.value)}
        onBlur={() => handleBlur(ammount, setAmmount)}
      />
      <button type="button" onClick={() => resetAfterSuccess(title, from, to, ammount)}>Add Payment</button>
    </div>
  );
};
export default NewUserPayment;

NewUserPayment.propTypes = {
  userList: PropTypes.arrayOf.isRequired,
  addUserPayment: PropTypes.func.isRequired,
};
