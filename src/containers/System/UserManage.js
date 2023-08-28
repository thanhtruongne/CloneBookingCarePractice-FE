import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUserClient,
    handleEditUserClient
} from '../../services/userServices'
import './UserManage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './ModalUser'
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'
import { times } from 'lodash';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrStateUserAll: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            currentUser: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserrFromReact();
    }

    getAllUserrFromReact = async () => {
        let response = await handleGetAllUser('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrStateUserAll: response.data
            })
        }
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    toggleModalUserEdit = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    handleEditUserClient = (item) => {
        this.setState({
            isOpenModalEditUser: true,
            currentUser: item
        })
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    createNewUser = async (data) => {
        try {
            let dataUserCreateClient = await handleCreateUser(data);
            if (dataUserCreateClient && dataUserCreateClient.errCode !== 0) {
                alert(dataUserCreateClient.message)
            } else {
                // set lại state khi tạo ở backend
                await this.getAllUserrFromReact();
                this.setState({
                    isOpenModal: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }

    }

    editNewUser = (data) => {
        this.setState({
            isOpenModal: true
        })
    }

    handleDeleteItem = async (item) => {
        try {
            let responseDelete = await handleDeleteUserClient(item.id);
            if (responseDelete && responseDelete.errCode !== 0) {
                alert(responseDelete.message)
            }
            else {
                await this.getAllUserrFromReact();
            }
        } catch (error) {
            console.log(error)
        }
    }


    //Phần edit user Client
    editUserFormClient = async (item) => {
       try {
           let dataUserPut = await handleEditUserClient(item);
           if(dataUserPut && dataUserPut.errCode !==0) {
            alert(dataUserPut.message);
           }
           else {
            await this.getAllUserrFromReact();
            this.setState({
                isOpenModalEditUser: false
            })
           }
       } catch (error) {
        
       }
    }



    render() {
        let dataUser = this.state.arrStateUserAll
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpenModal}
                    isOpenModal={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                    editNewUser={this.editNewUser}
                />
                {/* Editing user  */}
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpenModalUser={this.state.isOpenModalEditUser}
                        isOpenModalUserYet={this.toggleModalUserEdit}
                        user={this.state.currentUser}
                        editUserFormClient={this.editUserFormClient}
                    />
                }


                <div className="text-center">Manage users Lists Coures</div>
                <div className='container mt-4'>
                    <button className='btn btn-primary mb-5 px-2'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <FontAwesomeIcon icon={faPlus} className='px-2' />
                        Add new User modal
                    </button>
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>gender</th>
                            <th>roleID</th>
                            <th>Action</th>
                        </tr>
                        {dataUser && dataUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleEditUserClient(item)}
                                            className='Btn-Edit mx-2' style={{ backgroundColor: 'green' }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        <button
                                            className='Btn-Delete' style={{ backgroundColor: 'red' }}
                                            onClick={() => this.handleDeleteItem(item)}
                                        ><FontAwesomeIcon icon={faTrash} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
