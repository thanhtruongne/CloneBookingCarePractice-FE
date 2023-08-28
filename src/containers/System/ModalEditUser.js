import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './UserManage.scss'
import { invalid } from 'moment/moment';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter()

    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
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


    async componentDidMount() {
        let data = await this.props.user;
        console.log(!_.isEmpty(data))
        // check data có rỗng hay không
        if (data && !_.isEmpty(data)) {
            this.setState({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
            })
        }
    }


    toggle = () => {
        this.props.isOpenModalUserYet()
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
        const arrInputItem = ['firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInputItem.length; i++) {
            if (!this.state[arrInputItem[i]]) {
                inValid = true;
                alert('Missing parameter ' + arrInputItem[i]);
                break;
            }
        }

        return inValid;
    }


    handleAddUser = async () => {
        // hàm check validate
        let Invalid = this.checkValidateForm();
        if (Invalid === false) {
            let resphonse = await this.props.editUserFormClient(this.state);
        }
    }



    render() {
        return (
            <Modal isOpen={this.props.isOpenModalUser} toggle={() => { this.toggle() }} size='lg' centered
                className='Modal_container'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='mt-4'>
                        <div className='container'>
                            <div className='row'>
                                <div class="form-row">
                                    <div class="col-md-5 form-group">
                                        <label class="form-label">Email</label>
                                        <input type="email"
                                            onChange={(e) => this.handleInputChange(e, "email")}
                                            class="form-control" name="email" required disabled
                                            value={this.state.email}
                                        />
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label">Password</label>
                                        <input
                                            onChange={(e) => this.handleInputChange(e, "password")}
                                            disabled
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
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
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
