import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { Navbar } from "../components/Navbar";
import { Landing } from "../components/Landing";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { NotFound } from "../components/NotFound";
import { setName } from "../actions/user";
import { selectUserName } from "../reducers";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <Navbar/>
      <Switch>
          <Route exact path="/" component={Landing}/>
          {!this.props.token && <Route exact path="/login" component={Login}/>}
          {!this.props.token && <Route exact path="/signup" component={Register}/>}
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
        </BrowserRouter>
    );
  }
}

//To do
//Add unit testing(jest) for selectors, add integration and end to end testing
const mapStateToProps = (state, ownprops) => ({
  username: selectUserName(state),
  token: state.user.token
});

// const mapDispatchToProps = (dispatch) => ({
//   setName: (name) => dispatch(setName(name)),
// });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setName }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
