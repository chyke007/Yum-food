import React from "react";
import { connect } from "react-redux";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { BrowserRouter, Route,Redirect, Switch } from 'react-router-dom';
import Navbar  from "../components/Navbar";
import { Landing } from "./Landing";
import Login  from "./Login";
import { Register } from "./Register";
import { Product } from "./Product";
import {Order}  from "./Order";
import {SingleOrder}  from "../components/Order";
import {SingleProduct}  from "../components/Product";
import AddProduct  from "../components/Product/add";
import {Profile}  from "./Profile";
import  Shipping  from "../components/Cart/single";
import  PlaceOrder  from "../components/Cart/order";
import  Cart  from "./Cart";
import { NotFound } from "../components/NotFound";
import { selectToken, selectRole,selectCheckout } from "../reducers";
import { ADMIN } from "../constants"
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <Navbar/>
      <Switch>
         {/* TokenLess route */}
          <Route exact path="/login">
            {this.props.token ? (this.props.checkout ? <Redirect to="/checkout/123" /> : <Redirect to="/product" /> ) : <Login/>}
          </Route>
          <Route exact path="/signup">
            {this.props.token ? <Redirect to="/product" /> : <Register/>}
          </Route>
          {/* Open route */}
          <Route exact path="/" component={Landing}/>
          <Route exact path="/product" component={Product}/>
          <Route exact path="/product/add" >
          {this.props.token && this.props.role === ADMIN ? <AddProduct /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/product/:id" component={SingleProduct}/>
          <Route exact path="/checkout" component={Cart}/>
            {/* Secured Routes           */}
            {!this.props.token && <Redirect to="/login" />}
          <Route exact path="/checkout/:id" component={Shipping}/>
          <Route exact path="/placeorder" component={PlaceOrder}/>
          <Route exact path="/order/:id" component={SingleOrder}/>
          <Route exact path="/orders" component={Order}/>
          {this.props.token && <Route exact path="/profile" component={Profile}/>}
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
  role: selectRole(state),
  token: selectToken(state),
  checkout:selectCheckout(state)
})


export default connect(mapStateToProps)(App);
