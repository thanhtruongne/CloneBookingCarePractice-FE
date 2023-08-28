import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGE, USER_ROLE } from "../../utils";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import { changelanguageAction } from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./Header.scss";
import _ from 'lodash'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguages = (language) => {
    this.props.ChangeTypeLanguages(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let results = [];
    if (userInfo && !_.isEmpty(userInfo) ) {
      if (userInfo.roleId === USER_ROLE.ADMIN) {
        results = adminMenu;
      }
      if (userInfo.roleId === USER_ROLE.DOCTOR) {
        results = doctorMenu;
      }
    }

    this.setState({
      menuApp : results
    })
  }

  render() {
    const { processLogout } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="Languages">
          <span
            onClick={() => this.handleChangeLanguages(LANGUAGE.VI)}
            className="Language_VI"
          >
            VI
          </span>
          <span
            onClick={() => this.handleChangeLanguages(LANGUAGE.EN)}
            className="Language_EN"
          >
            EN
          </span>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    ChangeTypeLanguages: (language) =>
      dispatch(actions.changelanguageAction(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
