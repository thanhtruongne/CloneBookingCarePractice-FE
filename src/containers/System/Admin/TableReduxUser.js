import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TableReduxUser.scss";
import { ToastContainer, toast } from "react-toastify";
import * as actions from "../../../store/actions/index";
class TableReduxUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserReduxArray: [],
    };
  }
  componentDidMount() {
    this.props.GetAllUserRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listAllUserRedux !== this.props.listAllUserRedux) {
      this.setState({
        UserReduxArray: this.props.listAllUserRedux,
      });
    }
  }
  handleDeleteUserRedux = async (id) => {
    await this.props.DeleteUserRedux(id);
    await this.props.GetAllUserRedux();
  };

  handleEditUserRedux = (users) => {
    this.props.handleGetUserEdit(users);
  };

  render() {
    let dataUserRedux = this.state.UserReduxArray;
    return (
      <Fragment>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataUserRedux &&
              dataUserRedux.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{item.email}</th>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="d-flex">
                      <td
                        className="Edit_Table"
                        onClick={() => this.handleEditUserRedux(item)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </td>
                      <td
                        className="Trash_Table"
                        onClick={() => this.handleDeleteUserRedux(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listAllUserRedux: state.admin.AllUserRedux,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllUserRedux: () => dispatch(actions.FetchAllUserReduxStart()),
    DeleteUserRedux: (id) => dispatch(actions.FetchDeleteUserReduxStart(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableReduxUser);
