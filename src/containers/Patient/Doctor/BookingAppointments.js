import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Select from 'react-select';
import "./BookingAppointments.scss";
import { LANGUAGE } from "../../../utils";
import HomeHeader from "../../Homepage/HomeHeader";
import { 
  GetDetailDoctorDesc,
  GetTimeBookingDoctorSchedules,
  PostBookingDoctorSchedules 
} from "../../../services/userServices";
import moment from "moment";
import _ from'lodash';
import * as actions from '../../../store/actions/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {emitter} from '../../../utils/emitter'

class BookingAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
        InfoDoctor : [],
        time : '',
        Hours : '',
        GenderArray : [],
        //Value Patient
        fullname :'',
        phoneNumber :'',
        address :'',
        email :'',  
        dayofbirth:'',
        doctorId :'',
        Gender :'',
        reason :'',
        currentDate : '',
    };
    this.listenToEmitter()
  }

listenToEmitter()   {
    emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
      //RESET DATA
      this.setState({
        fullname :'',
        phoneNumber :'',
        address :'',
        email :'',  
        dayofbirth:'',
        doctorId :'',
        Gender :'',
        reason :'',
        currentDate : ''
      })
    })
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    let Time = moment(Number(this.props.match.params.time)).format('dddd - DD/MM/YYYY');
    let response =  await GetDetailDoctorDesc(id);
    await this.props.fetchGenderData();
    let TakeHours = await GetTimeBookingDoctorSchedules(this.props.match.params.type);
    if(response && response.errCode === 0) {
      this.setState({
        InfoDoctor :response.data,
        time : Time,
        Hours : TakeHours.data
      })  
    }
  }

  

  async componentDidUpdate(prevProps,prevState) {
    if(prevProps.language != this.props.language) {
      await this.props.fetchGenderData();
    }
    if(prevProps.genders != this.props.genders) {
      let resulst =[];
      let StateGender = this.props.genders;
      if(StateGender && StateGender.length ) {
        StateGender.map((item,index) => {
          let obj ={};
          obj.label = this.props.language === LANGUAGE.VI ? item.valueVi : item.valueEn;
          obj.value = item.keyMap;
          resulst.push(obj);
        })
        this.setState({
          GenderArray : resulst
        })
      }
    }
  }

  handleOnchangeValue =(e,name) => {
     let coypState = {...this.state};
     coypState[name] = e.target.value;
     this.setState({
      ...coypState
     })
  }

  // Create DoctorName (vi/en)
  buildDataNameDoctorSchedules = (data) => {
    let name = this.props.language === LANGUAGE.VI 
    ? `${data.postisionData.valueVi}, ${data.firstName} ${data.lastName}` 
    : `${data.postisionData.valueEn}, ${data.lastName} ${data.firstName}` 
     return name;
  }

  buildDataTimeDoctorBooking =(data) => {
    let time = this.props.language === LANGUAGE.VI ? data.valueVi:data.valueEn
    return time;
  }

  handleChange = (Gender) => {
    this.setState({ Gender })
  };

  handleDateSelect =(date) => {
    this.setState({
      currentDate : date
    })
  }

  handleSaveBookingSchedules = async() => {
    let DoctorName = this.buildDataNameDoctorSchedules(this.state.InfoDoctor);
    let time = this.buildDataTimeDoctorBooking(this.state.Hours);
    let response = await PostBookingDoctorSchedules({
    doctorId : this.props.match.params.id,
    email : this.state.email,
    fullName : this.state.fullname,
    address : this.state.address,
    phoneNumber : this.state.phoneNumber,
    reason : this.state.reason,
    gender : this.state.Gender.value,
    date : this.props.match.params.time,
    timeType : this.props.match.params.type,
    dayofbirth : this.state.currentDate,
    doctorName : DoctorName,
    TimeEmail : time,
    language : this.props.language
  })
  if(response && response.errCode === 0) {
       toast.success(response.message);
       emitter.emit('EVENT_CLEAR_MODAL_DATA')
  }
  else {
    toast.error(response.message);
  }
  }


  render() {
    let {InfoDoctor,time,Hours} = this.state;
    let nameVi ='',nameEn = '',priceVi = '',priceEn='';
    if(InfoDoctor && InfoDoctor.postisionData) {
      nameVi =InfoDoctor.postisionData.valueVi;
      nameEn =InfoDoctor.postisionData.valueEn;
    }
    if(InfoDoctor && InfoDoctor.doctor_info && InfoDoctor.doctor_info.PriceData) {
      priceVi = InfoDoctor.doctor_info.PriceData.valueVi;
      priceEn = InfoDoctor.doctor_info.PriceData.valueEn;
    }
      return (
        <React.Fragment>
      <div className="container">
        <div className="row">
        <HomeHeader ishowBanner={false} />
        </div>
      </div>
        <div className="body_container_info">
            <div className="wrapper_info">
              <div className="Info_doctor">
                <div className="backgroundDoctor" >
                  <img src={InfoDoctor.image} />
                </div>
                <div className="Description_doctor">
                     <h1>ĐẶT LỊCH KHÁM</h1>
                     <h2 className="name_doctor">
                        {this.props.language === LANGUAGE.VI ? nameVi : nameEn} , 
                        {`${InfoDoctor.firstName} ${InfoDoctor.lastName}`}
                     </h2>
                     <div className="desc_time_doctor">
                          {Hours.valueVi}  -  {time}
                     </div>
                     <div className="price_schedules">
                          Giá Khám :
                            <span>  {this.props.language === LANGUAGE.VI ? `${priceVi} VND` : `${priceEn} $`}</span>
                     </div>
                </div>
              </div>

            </div>
        </div>
              <div className="container">
              <div className="Type_input-check d-flex justify-content-center flex-column align-items-center">
                  <div className="col-lg-6 form-group mb-4 mt-3">      
                      <input type="text" className="form-control" placeholder="FullName"
                      value={this.state.fullname}
                      onChange={(e) => this.handleOnchangeValue(e,'fullname')}
                      />
                  </div>
                  <div className="col-lg-6 form-group mb-4 mt-3">      
                      <input type="text" className="form-control" placeholder="Email"
                      value={this.state.email}
                      required
                      onChange={(e) => this.handleOnchangeValue(e,'email')}
                      />
                  </div>
                  <div className="col-lg-6 form-group mb-4">
                      <input type="number" className="form-control" placeholder="PhoneNumber"
                          value={this.state.phoneNumber}
                       onChange={(e) => this.handleOnchangeValue(e,'phoneNumber')}/>
                  </div>
                  <div className="col-lg-6 form-group mb-4">
                  <DatePicker
                    selected={this.state.currentDate}
                    onChange={this.handleDateSelect}
                  
                    className='form-control'
                    placeholderText="DayOfBirth"
                    />
                  </div>
                  <div className="col-lg-6 form-group mb-4">
                      <input type="text" className="form-control" placeholder="Địa chỉ nhà"
                         value={this.state.address}
                      onChange={(e) => this.handleOnchangeValue(e,'address')}/>
                  </div>
                  <div classNme="col-lg-6 form-group mb-4">
                  <Select
                    value={this.state.Gender}
                    onChange={this.handleChange}
                    options={this.state.GenderArray}
                    className="form-control"
                    placeholder="Giới Tính"
                  />
                  </div>
                  <div className="col-lg-6 form-group mb-4">
                      <input type="text" className="form-control" placeholder="Lý do khám"
                       value={this.state.reason}
                     onChange={(e) => this.handleOnchangeValue(e,'reason')}/>
                  </div>
                  <div className="col-lg-6 form-group mt-4" >
                    <button className="btn btn-warning button_dash"
                    onClick={() => this.handleSaveBookingSchedules()}
                    >Xác nhận đặt lịch khám</button>
                  </div>
              
              </div>  

              </div>
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
        </React.Fragment>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders : state.admin.genders
  };
};
// sử dụng dispatch trong hàm này để sử dụng redux
const mapDispatchToProps = (dispatch) => {
  return {
        fetchGenderData : () =>  dispatch(actions.fetchGenderStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingAppointments);
