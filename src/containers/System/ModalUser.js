import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './UserManage.scss'
import { invalid } from 'moment/moment';
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter()

    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
          //RESET DATA
          this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
          })
        })
    }
    handleResetValueInput =() => {
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.isOpenModal();
    }

    handleInputChange = (e, id) => {
        // sử dụng tối ưu code ... theo cách mới
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateForm = () => {
        let inValid = false;
        const arrInputItem = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInputItem.length; i++) {
            if (!this.state[arrInputItem[i]]) {
                inValid = true;
                alert('Missing parameter '  + arrInputItem[i]);
                break;
            }
        }

        return inValid;
    }

    handleAddUser = async() => {
        // hàm check validate
      let Invalid = this.checkValidateForm();
      if(Invalid === true) {
         return
      }
      else {
        await this.props.createNewUser(this.state)
      }
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} size='lg' centered
                className='Modal_container'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create New User</ModalHeader>
                <ModalBody>
                    <div className='mt-4'>
                        <div className='container'>
                            <div className='row'>
                                <div class="form-row">
                                    <div class="col-md-5 form-group">
                                        <label class="form-label">Email</label>
                                        <input type="email"
                                            onChange={(e) => this.handleInputChange(e, "email")}
                                            class="form-control" name="email" required
                                            value={this.state.email}
                                        />
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label">Password</label>
                                        <input
                                            onChange={(e) => this.handleInputChange(e, "password")}
                                            value={this.state.password}
                                            type="password" class="form-control" name="password" required />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-5">
                                        <label class="form-label">Fristname</label>
                                        <input
                                            onChange={(e) => this.handleInputChange(e, "firstName")}
                                            value={this.state.firstName}
                                            type="text" class="form-control" name="firstName" required />

                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label">Last name</label>
                                        <input
                                            onChange={(e) => this.handleInputChange(e, "lastName")}
                                            value={this.state.lastName}
                                            type="text" class="form-control" name="lastName" required />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-11">
                                        <label class="form-label">Address</label>
                                        <input
                                            onChange={(e) => this.handleInputChange(e, "address")}
                                            value={this.state.address}
                                            type="text" class="form-control" name="address" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => this.handleAddUser()}
                        color="primary" className='px-3'>
                      Create Users
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                    <Button color="primary" className='px-3' onClick={() => { this.handleResetValueInput()}}>
                        Reset Value
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
