import React from 'react';
import PropTypes from 'prop-types';
import { handleBlur } from './NewUserPayment';

const NewEventPaymentPUD = ({
  userList, ua, setUsernameAmmount, deleteSelf,
}) => (
  <div className="NewEventPaymentPUD">
    <div>
      <label className="newPay-input ftLabel" htmlFor="NewUserPayment-from-select">
        Select user from.
        <select
          id="NewUserPayment-to-select"
          aria-label="Select to"
          value={ua.username === '' ? userList[0] : ua.username}
          onChange={(e) => { setUsernameAmmount(e.target.value, ua.ammount); }}
        >
          {userList.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </label>

      <input
        type="number"
        className="newPay-input"
        value={ua.ammount}
        onChange={(e) => setUsernameAmmount(ua.username, e.target.value)}
        onBlur={() => handleBlur(ua.ammount, (ammount) => setUsernameAmmount(ua.username, ammount))}
      />
    </div>
    <button className="close" onClick={deleteSelf} type="button">&times;</button>
  </div>

);

export default NewEventPaymentPUD;

NewEventPaymentPUD.propTypes = {
  userList: PropTypes.arrayOf.isRequired,
  ua: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    ammount: PropTypes.number,
  }).isRequired,
  setUsernameAmmount: PropTypes.func.isRequired,
  deleteSelf: PropTypes.func.isRequired,
};
