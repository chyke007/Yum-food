import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { User } from "../components/User";
import { Main } from "../components/Main";
import { setName } from "../actions/user";
import { selectUserName } from "../reducers";
class App extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.at}
        <Main changeUsername={() => this.props.setName("Anna")} />
        <User username={this.props.username} />
      </div>
    );
  }
}

//To do
//Add unit testing(jest) for selectors, add integration and end to end testing
const mapStateToProps = (state, ownprops) => ({
  username: selectUserName(state),
  math: state.math,
  at: ownprops.at,
  //ownprops optional
});

// const mapDispatchToProps = (dispatch) => ({
//   setName: (name) => dispatch(setName(name)),
// });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setName }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
