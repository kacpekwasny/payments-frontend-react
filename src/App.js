/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import {
  BrowserRouter as Rtr, Route,
} from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';
import MainRoom from './roomMain/MainRoom';
import NewPayment from './roomNewPayment/NewPayment';
import RoomSettings from './roomSettings/RoomSettings';
import RoomCreatePick from './roomCreatePick/RoomCreatePick';
import WallLink from './components/WallLink';

import { getck } from './libs/cookies/funcs';

import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.getLocalRoomDataMaybeRemote = this.getLocalRoomDataMaybeRemote.bind(this);
    this.apiGetRoomData = this.apiGetRoomData.bind(this);
    this.apiGetMyRooms = this.apiGetMyRooms.bind(this);
    this.apiChangeAcceptPayment = this.apiChangeAcceptPayment.bind(this);
    this.apiAddUserPayment = this.apiAddUserPayment.bind(this);
    this.apiAddEventPayment = this.apiAddEventPayment.bind(this);
    this.apiAddUserToRoom = this.apiAddUserToRoom.bind(this);
    this.apiRemoveUser = this.apiRemoveUser.bind(this);
    this.apiSetRoomName = this.apiSetRoomName.bind(this);
    this.apiSetRoomDesc = this.apiSetRoomDesc.bind(this);
    this.apiChangeUserRole = this.apiChangeUserRole.bind(this);
    this.apiNewRoom = this.apiNewRoom.bind(this);
    this.apiLeaveRoom = this.apiLeaveRoom.bind(this);

    this.getParams = this.getParams.bind(this);
    this.handleRes = this.handleRes.bind(this);
    this.render = this.render.bind(this);
    this.loadData = this.loadData.bind(this);
    this.state = {
      historyPayments: [],
      pendingPayments: [],
      roomName: '',
      roomDesc: '',
      saldo: 0,
      usersInRoom: [],
      usersRole: {},
      amAdmin: false,
      myRooms: [],
    };
    this.baseURL = '/payments/room';
    this.API_URL = 'https://devtgnoik.kwasnyy.pl/api/payments/v1';

    this.loadData();
  }

  async handleRes(res) {
    const js = await res.json();
    if (js.err_code === 10) {
      window.location = '/login';
      return false;
    }
    if (js.err_code !== 0) {
      console.error(js);
      return false;
    }
    this.apiGetRoomData();
    return true;
  }

  getLocalRoomDataMaybeRemote() {
    // this.username = 'u1';
    // this.token = 'token';
    this.username = getck('login');
    this.token = getck('token');
    if (this.username === '') {
      window.location = '/login';
    }

    if (window.location.pathname === `${this.baseURL}/room-create-pick`) {
      return;
    }
    if (![`${this.baseURL}/main`, `${this.baseURL}/new-payment`, `${this.baseURL}/settings`].includes(window.location.pathname)) {
      window.location = `${this.baseURL}/room-create-pick`;
      return;
    }

    const url = new URL(window.location.href);
    const roomLink = url.searchParams.get('roomLink');
    console.log('roomLink', roomLink);
    if (roomLink === null || roomLink === undefined) {
      console.error('to doesnt include roomLink', window.location.to);
      window.location = `${this.baseURL}/room-create-pick`;
    }
    this.roomLink = roomLink;
    this.apiGetRoomData();
  }

  getParams() {
    return `?roomLink=${this.roomLink}`;
  }

  makeGenRoomLink() {
    const baseurl = this.baseURL;
    return function (link) {
      return `${baseurl}/main?roomLink=${link}`;
    };
  }

  loadData() {
    this.getLocalRoomDataMaybeRemote();

    // this.apiGetRoomData();
    this.apiGetMyRooms();
  }

  async apiGetRoomData() {
    const res = await fetch(`${this.API_URL}/get/room-data/${this.roomLink}/${this.username}/${this.token}`);
    const js = await res.json();
    if (js.err_code === 0) {
      this.setState({
        pendingPayments: js.pending_payments,
        historyPayments: js.history_payments,
        roomName: js.room_name,
        roomDesc: js.room_desc,
        saldo: js.saldo,
        usersInRoom: js.users,
        usersRole: js.users_role,
        amAdmin: js.am_admin,
      });
    } else if (js.err_code === 10) {
      window.location = '/login';
    } else {
      console.error(js);
    }
  }

  async apiGetMyRooms() {
    console.log('this', this);
    const res = await fetch(`${this.API_URL}/get/my-rooms/${this.username}/${this.token}`);
    const js = await res.json();
    console.log('my_rooms', js);
    if (js.err_code === 0) {
      this.setState({
        myRooms: js.my_rooms,
      });
    } if (js.err_code === 10) {
      window.location = '/login';
    } else {
      console.error(js);
    }
  }

  async apiChangeAcceptPayment(payment_, isAccepting) {
    const payment = payment_;
    const url = `${this.API_URL}/update/set-accept-payment/${this.roomLink}/${this.username}/${this.token}/${payment.data.id}/${isAccepting ? 'accept' : 'unaccept'}`;

    const res = await fetch(url, {
      method: 'PUT',
    });
    this.handleRes(res);

    // isAccepting - button which triggered this function
    //   was accepting this payment
  }

  async apiAddUserPayment(title, from, to, ammount) {
    const url = `${this.API_URL}/post/new-payment/${this.roomLink}/${this.username}/${this.token}`;

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        type: 'UserPayment',
        data: {
          title,
          from_username: from,
          to_username: to,
          ammount: parseFloat(ammount),
        },
      }),
    });

    return this.handleRes(res);
  }

  async apiAddEventPayment(title, usersAmmount) {
    const url = `${this.API_URL}/post/new-payment/${this.roomLink}/${this.username}/${this.token}`;

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        type: 'EventPayment',
        data: {
          title,
          ammounts: Object.fromEntries(new Map(
            usersAmmount.map((ua) => [ua.username, parseFloat(ua.ammount)]),
          )),
        },
      }),
    });
    return this.handleRes(res);
  }

  async apiAddUserToRoom(username) {
    const url = `${this.API_URL}/post/add-user-room/${this.roomLink}/${this.username}/${this.token}/${username}`;

    const res = await fetch(url, {
      method: 'POST',
    });
    this.handleRes(res);
  }

  async apiRemoveUser(username) {
    const url = `${this.API_URL}/post/remove-user-room/${this.roomLink}/${this.username}/${this.token}/${username}`;

    const res = await fetch(url, {
      method: 'POST',
    });
    this.handleRes(res);
  }

  async apiSetRoomName(roomName) {
    console.log(roomName);
    const url = `${this.API_URL}/update/room-name-desc/${this.roomLink}/${this.username}/${this.token}`;

    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        roomName,
      }),
    });
    return this.handleRes(res);
  }

  async apiSetRoomDesc(roomDesc) {
    const url = `${this.API_URL}/update/room-name-desc/${this.roomLink}/${this.username}/${this.token}`;

    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        roomDesc,
      }),
    });
    this.handleRes(res);
  }

  async apiChangeUserRole(username, role) {
    const url = `${this.API_URL}/update/change-user-role/${this.roomLink}/${this.username}/${this.token}/${username}/${role}`;

    const res = await fetch(url, {
      method: 'PUT',
    });
    return this.handleRes(res);
  }

  async apiNewRoom() {
    const url = `${this.API_URL}/post/new-room/${this.username}/${this.token}`;

    const res = await fetch(url, {
      method: 'POST',
    });
    const js = await res.json();
    if (js.err_code === 0) {
      this.apiGetMyRooms();
    }
    if (js.err_code === 10) {
      window.location = '/login';
    }
  }

  async apiLeaveRoom(roomLink) {
    const url = `${this.API_URL}/post/leave-room/${roomLink}/${this.username}/${this.token}`;

    const res = await fetch(url, {
      method: 'POST',
    });
    const js = await res.json();
    if (js.err_code === 0) {
      this.apiGetMyRooms();
    }
    if (js.err_code === 10) {
      window.location = '/login';
    }
  }

  render() {
    console.log('App.render()');
    return (
      <Rtr>
        <div className="App">
          <Route path={`${this.baseURL}/(main|new-payment|settings)`}>
            <Nav
              username={this.username}
              saldo={this.state.saldo}
              roomName={this.state.roomName}
              baseURL={this.baseURL}
              reload={this.apiGetRoomData}
            />
          </Route>
          <WallLink baseURL={this.baseURL} LR="left" urlParams={this.getParams()} />
          <WallLink baseURL={this.baseURL} LR="right" urlParams={this.getParams()} />
          <Route path={`${this.baseURL}/main`}>
            <MainRoom
              username={this.username}
              historyPayments={this.state.historyPayments}
              pendingPayments={this.state.pendingPayments}
              onAccept={this.apiChangeAcceptPayment}
            />
          </Route>
          <Route path={`${this.baseURL}/new-payment`}>
            <NewPayment
              userList={this.state.usersInRoom}
              addUserPayment={this.apiAddUserPayment}
              addEventPayment={this.apiAddEventPayment}
            />
          </Route>
          <Route path={`${this.baseURL}/settings`}>
            <RoomSettings
              amAdmin={this.state.amAdmin}
              userList={this.state.usersInRoom}
              usersRole={this.state.usersRole}
              addUser={this.apiAddUserToRoom}
              roomName={this.state.roomName}
              setRoomName={this.apiSetRoomName}
              roomDesc={this.state.roomDesc}
              setRoomDesc={this.apiSetRoomDesc}
              changeUserRole={this.apiChangeUserRole}
              removeUser={this.apiRemoveUser}
              myName={this.username}
            />
          </Route>
          <Route path={`${this.baseURL}/room-create-pick`}>
            <RoomCreatePick
              myRooms={this.state.myRooms}
              genRoomLink={this.makeGenRoomLink()}
              createRoom={this.apiNewRoom}
              leaveRoom={this.apiLeaveRoom}
            />
          </Route>
          <Footer />
        </div>
      </Rtr>
    );
  }
}

// App.propTypes = {
//  location: PropTypes.string.isRequired,
// };
//
