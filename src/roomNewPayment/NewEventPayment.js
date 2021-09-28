/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewEventPaymentPUD from './NewEventPaymentPUD';

function addUserEP(setUsersAmmount, defaultUsername) {
  setUsersAmmount((prev) => [...prev, { username: defaultUsername, ammount: '', id: Math.random() }]);
}

function deleteUA(id, setUsersAmmount) {
  setUsersAmmount((prev) => prev.filter((ua) => ua.id !== id));
}

function setUsernameAmmount(id, username, ammount, setUA) {
  setUA((prev) => (
    prev.map((ua) => {
      if (ua.id === id) {
        return {
          id,
          username,
          ammount,
        };
      }
      return ua;
    })
  ));
}

function eventPaymentValid(title, usersAmmount) {
  if (!(title.length > 0 && title.length < 250) || usersAmmount.length < 2) {
    return false;
  }
  const mp = new Map();

  for (const ua of usersAmmount) {
    const count = mp.get(ua.username);
    if (count === undefined) {
      mp.set(ua.username, 1);
    }
    if (count === 1) {
      return false;
    }
    if (ua.ammount <= 0) {
      return false;
    }
  }
  return true;
}

const NewEventPayment = ({ userList, addEventPayment }) => {
  const [usersAmmount, setUsersAmmount] = useState([]);
  const [title, setTitle] = useState('');

  function resetAfterSuccessAddEP(titleIn, userAmmountIn) {
    addEventPayment(titleIn, userAmmountIn).then(() => {
      setTitle('');
      setUsersAmmount([]);
    });
  }

  return (
    <div className="NewEventPayment">
      <input type="text" className="newPay-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      { usersAmmount.length < userList.length
      && (
      <button className="add-user-to-ep" type="button" onClick={() => addUserEP(setUsersAmmount, userList[0])}>
        Add user to event payment
      </button>
      )}
      {
        usersAmmount.map((ua) => (
          <NewEventPaymentPUD
            key={ua.id}
            ua={ua}
            userList={userList}
            setUsernameAmmount={
              (username, ammount) => setUsernameAmmount(ua.id, username, ammount, setUsersAmmount)
            }
            deleteSelf={() => deleteUA(ua.id, setUsersAmmount)}
          />
        ))
      }
      {
        eventPaymentValid(title, usersAmmount)
      && <button type="button" onClick={() => resetAfterSuccessAddEP(title, usersAmmount)}>Add payment</button>
      }
    </div>
  );
};
export default NewEventPayment;

NewEventPayment.propTypes = {
  userList: PropTypes.arrayOf.isRequired,
  addEventPayment: PropTypes.func.isRequired,
};
