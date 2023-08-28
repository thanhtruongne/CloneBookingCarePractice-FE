import React, { Component, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLifeRing, faUpload } from '@fortawesome/free-solid-svg-icons'
import { getAllCodeServices } from '../../../services/userServices';
import { LANGUAGE } from '../../../utils';
import './UserRedux.scss'
import { ACTION_CRUD, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import TableReduxUser from './TableReduxUser';
import * as actions from '../../../store/actions/index'
import ImageViewer from 'react-simple-image-viewer';
import { Fragment } from 'react';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],
            PostisionArray: [],
            RoleArray: [],
            previewURL: '',
            isOpenPreview: false,

            // Phần CreateUserRedux
            id: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: '',
            firstName: '',
            lastName: '',
            image: '',
            gender: '',
            postisionId: '',
            roleId: '',

            action: ''
        }

    }

    componentDidMount() {
        this.props.GenderFetch();
        this.props.PositionFetch();
        this.props.RoleFetch();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderMount = this.props.genderRedux;
            this.setState({
                genderArray: this.props.genderRedux,
                gender: genderMount && genderMount.length > 0 ? genderMount[0].keyMap : ''
            })
        }

        if (prevProps.potisionRedux !== this.props.potisionRedux) {
            let postisionIdMount = this.props.potisionRedux
            this.setState({
                PostisionArray: this.props.potisionRedux,
                postisionId: postisionIdMount && postisionIdMount.length > 0 ? postisionIdMount[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let RoleMount = this.props.roleRedux;
            this.setState({
                RoleArray: this.props.roleRedux,
                roleId: RoleMount && RoleMount.length > 0 ? RoleMount[0].keyMap : ''
            })
        }
        
        if (prevProps.listAllUserRedux !== this.props.listAllUserRedux) {
            let genderReduxSave = this.props.genderRedux;
            let possitionReduxSave = this.props.potisionRedux;
            let roleReduxSave = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                firstName: '',
                lastName: '',
                previewURL: '',
                image :'',
                gender: genderReduxSave && genderReduxSave.length > 0 ? genderReduxSave[0].keyMap : '',
                postisionId: possitionReduxSave && possitionReduxSave.length > 0 ? possitionReduxSave[0].keyMap : '',
                roleId: roleReduxSave && roleReduxSave.length > 0 ? roleReduxSave[0].keyMap : '',
                action: ACTION_CRUD.CREATE
            })
        }

    }

    handleImageSaveAvatar = async (e) => {
        let dataImage = e.target.files;
        let file = dataImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
       
            this.setState({
                previewURL: URL.createObjectURL(file),
                image: base64
            })

        }
    }
    handleOpenPreview = () => {
        this.setState({
            isOpenPreview: true,

        })
    }
    handleClosePreview = () => {
        this.setState({
            isOpenPreview: false
        })
    }
    handleOnchangeInput = (e, type) => {
        let stateChange = { ...this.state };
        stateChange[type] = e.target.value;
        this.setState({
            ...stateChange
        })

    }

    checkValidInputChange = () => {
        let Valid = false
        let arrayCheck = ['email', 'password', 'address', 'phoneNumber', 'firstName', 'lastName',]
        for (let i = 0; i < arrayCheck.length; i++) {
            if (!this.state[arrayCheck[i]]) {
                toast.warn('Missing Parameter ' + arrayCheck[i]);
                // alert('Missing parameter ' + arrayCheck[i]);
                Valid = true;
                break;
            }
        }
        return Valid;
    }

    handleSaveUsersRedux = async (e) => {
        e.preventDefault();
        let Valid = this.checkValidInputChange();
        if (Valid === true) { return }
        if (this.state.action === ACTION_CRUD.CREATE) {
                await this.props.SaveUserSuccess({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.roleId,
                postisionId: this.state.postisionId,
                gender: this.state.gender,
                image: this.state.image,
            })
          
        }
        if (this.state.action === ACTION_CRUD.EDIT) {
         let dataUpdate = await this.props.EditUserReduxData({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.roleId,
                postisionId: this.state.postisionId,
                gender: this.state.gender,
                image: this.state.image,
            })
           toast.success('UPDATED : SUCCESSFULLY TO UPDATE');
        }
        // hàm render ra user khi createUser
        await this.props.GetAllUserRedux();
    }

    handleGetUserEdit = (user) => {    
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image,'base64').toString('binary');
        }
        this.setState({
            id: user.id,
            email: user.email,
            password: 'Hiding this password',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            postisionId: user.postisionId,
            roleId: user.roleId,
            previewURL: imageBase64,
            image: '',

            action: ACTION_CRUD.EDIT
        })

    }

    render() {
        let images = [`${this.state.previewURL}`]
        let Gender = this.state.genderArray;
        let potision = this.state.PostisionArray;
        let role = this.state.RoleArray;
        let Language = this.props.language;
        let LoadingState = this.props.isLoadingstate;
        let URLImageAvatar = this.state.previewURL
        const { email, password, address
            , firstName, lastName, phoneNumber,
            roleId, postisionId, gender, image, previewURL } = this.state;
        return (
            <div className='Auto_Height'>
                <div className='user-redux-container'>
                    <div className='title'>User Redux</div>
                    <div className='container'>
                        {LoadingState === true ? (
                            <div class="overlay">
                                <div class="overlay__inner">
                                    <div class="overlay__content"><span class="spinner"></span></div>
                                </div>
                            </div>
                        )
                            : ''
                        }

                        <div className='text-center'>
                            <FormattedMessage id="manager-user.add_user" />
                        </div>
                        <form class="row g-3">
                            <div class="col-md-3">
                                <label for="inputEmail4" class="form-label">  <FormattedMessage id="manager-user.Email" /></label>
                                <input type="email" class="form-control" id="inputEmail4"
                                    value={email}
                                    disabled={this.state.action === ACTION_CRUD.EDIT ? true : false}
                                    onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                />
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label"><FormattedMessage id="manager-user.Password" /></label>
                                <input type="password" class="form-control" id="inputPassword4"
                                    value={password}
                                    disabled={this.state.action === ACTION_CRUD.EDIT ? true : false}
                                    onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                />
                            </div>
                            <div class="col-md-3">
                                <label for="inputAddress" class="form-label"><FormattedMessage id="manager-user.FirstName" /></label>
                                <input type="text" class="form-control" id="FirstName" name='firstName'
                                    value={firstName}
                                    onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                />
                            </div>
                            <div class="col-md-3">
                                <label for="inputAddress2" class="form-label"><FormattedMessage id="manager-user.LastName" /></label>
                                <input type="text" class="form-control" id="LastName" name='lastName'
                                    value={lastName}
                                    onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputAddress2" class="form-label"><FormattedMessage id="manager-user.PhoneNumber" /> </label>
                                <input type="text" class="form-control" id="Phonenumber" name='Phonenumber'
                                    value={phoneNumber}
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label"><FormattedMessage id="manager-user.Address" /></label>
                                <input type="text" class="form-control" id="Address" name='address'
                                    value={address}
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                />
                            </div>
                            <div class="col-md-3">
                                <label for="inputState" class="form-label"><FormattedMessage id="manager-user.Gender" /></label>
                                <select id="Gender" class="form-select"
                                    value={gender}
                                    onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                >
                                    {Gender && Gender.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {Language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputState" class="form-label"><FormattedMessage id="manager-user.Postision" /></label>
                                <select id="Postision" class="form-select"
                                    value={postisionId}
                                    onChange={(e) => this.handleOnchangeInput(e, 'postisionId')}
                                >
                                    {potision && potision.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {Language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputState" class="form-label"><FormattedMessage id="manager-user.Role" /></label>
                                <select id="Postision" class="form-select"
                                    value={roleId}
                                    onChange={(e) => this.handleOnchangeInput(e, 'roleId')}
                                >
                                    {role && role.map((item, index) => {
                    
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {Language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="col-md-3 image_wrapper">
                                <label for="inputZip" class="form-label"><FormattedMessage id="manager-user.Image" /></label>
                                <input

                                    onChange={(e) => this.handleImageSaveAvatar(e)}
                                    type="file" class="form-control" id="Avatar"
                                    hidden />
                                <label
                                    className='Label_avatar'
                                    htmlFor="Avatar">Tải ảnh
                                    <FontAwesomeIcon icon={faUpload} className='Icon_upload' />
                                </label>
                                <div className='Append_avatart'
                                    style={{ backgroundImage: `url(${this.state.previewURL})` }}
                                    onClick={() => this.handleOpenPreview()}
                                >
                                </div>
                                {this.state.isOpenPreview === true ?
                                    (<ImageViewer
                                        src={images}
                                        closeOnClickOutside={true}
                                        disableScroll={false}
                                        onClose={() => this.handleClosePreview()}
                                    />) : ''}
                            </div>
                            <div class="col-12">
                                <button type="submit"
                                    onClick={(e) => this.handleSaveUsersRedux(e)}
                                    class={this.state.action === ACTION_CRUD.EDIT ? " btn btn-warning" : "btn btn-primary"}>
                                    {this.state.action === ACTION_CRUD.EDIT ?
                                        (<FormattedMessage id="manager-user.Change_Edit_Save" />)
                                        : (<FormattedMessage id="manager-user.Save" />)
                                    }

                                </button>
                            </div>
                        </form>

                    </div>

                </div>

                <div className='container'>
                    <TableReduxUser handleGetUserEdit={this.handleGetUserEdit} />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        potisionRedux: state.admin.potisions,
        roleRedux: state.admin.roles,
        isLoadingstate: state.admin.isLoadingState,
        listAllUserRedux: state.admin.AllUserRedux
    };
};

const mapDispatchToProps = dispatch => {
    return {
        GenderFetch: () => dispatch(actions.fetchGenderStart()),
        RoleFetch: () => dispatch(actions.fetchRoleStart()),
        PositionFetch: () => dispatch(actions.fetchPositionStart()),
        SaveUserSuccess: (data) => dispatch(actions.SaveUserStart(data)),
        GetAllUserRedux: () => dispatch(actions.FetchAllUserReduxStart()),
        EditUserReduxData: (data) => dispatch(actions.FetchEditUserReduxStart(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
