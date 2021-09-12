import React from 'react';
import { Login, Signup } from './AuthForm';
import { connect } from 'react-redux';
import { me, logout } from '../store/auth';

class App extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
  }

  handleClick() {
    this.props.logout();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.currentlyLoggedIn ? (
          <div>
            <h1>Hello {this.props.username}!</h1>
            <button onClick={this.handleClick}>Log Out</button>
          </div>
        ) : (
          <div>
            <h1>Hello World!</h1>
            <h2>Log In</h2>
            <Login />
            <h2>Sign Up</h2>
            <Signup />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentlyLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(me()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
