import { Component } from "react";
import { withRouter } from "react-router";

import { signOut } from "../../api/auth";
import messages from "../AutoDismissAlert/messages";

class SignOut extends Component {
  componentDidMount() {
    const { msgAlert, history, clearUser, user } = this.props;
    clearUser()
    localStorage.removeItem("token");
    signOut(user)
      .finally(() =>
        msgAlert({
          heading: "Signed Out Successfully",
          message: messages.signOutSuccess,
          variant: "success",
        })
      )
  }

  render() {
    return "";
  }
}

export default withRouter(SignOut);
