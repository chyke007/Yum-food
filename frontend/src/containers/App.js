import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { Navbar } from "../components/Navbar";
import { Landing } from "./Landing";
import { Login } from "./Login";
import { Register } from "./Register";
import { Product } from "./Product";
import {Order}  from "./Order";
import {SingleOrder}  from "../components/Order";
import {Profile}  from "./Profile";
import  SingleProduct  from "../components/Cart/single";
import  PlaceOrder  from "../components/Cart/order";
import { Cart } from "./Cart";
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
          <Route exact path="/product" component={Product}/>
          <Route exact path="/checkout/:id" component={SingleProduct}/>
          <Route exact path="/checkout" component={Cart}/>
          <Route exact path="/placeorder" component={PlaceOrder}/>
          <Route exact path="/order/:id" component={SingleOrder}/>
          <Route exact path="/orders" component={Order}/>
          <Route exact path="/profile" component={Profile}/>
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
