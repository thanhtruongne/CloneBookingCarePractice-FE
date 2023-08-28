import React, { Component, Fragment, forwardRef } from "react";
import { connect } from "react-redux";
import { FormattedMessage} from "react-intl"
import Header from "../../Header/Header";
import DatePicker from "react-datepicker";
import { LANGUAGE } from "../../../utils";
import "./ManagerPatientList.scss";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { GetListPatientDoctor ,SendRemedyPatient} from "../../../services/userServices";
import RemedyPatient from "./RemedyPatient";
import _ from "lodash";
class ManagerPatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    CurrentDate : new Date(),
    PatientData : [],
    isOpenModal :false,
    dataModal : {}
    };
  }


  async componentDidMount() {    
    await this.FetchDataListPatient();
  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.state.CurrentDate != prevState.CurrentDate) {
      let id = this.props.userInfo.id
      let response = await GetListPatientDoctor(id,this.state.CurrentDate);
      if(response && response.errCode ===0) {
        this.setState({
          PatientData :response.Test 
        })
      }
    }
  }

  FetchDataListPatient = async() => {
    let id = this.props.userInfo.id
    let response = await GetListPatientDoctor(id,this.state.CurrentDate);
    if(response && response.errCode === 0) {
      this.setState({
        PatientData :response.Test 
      })
    }
  }

  handleChangeDateSchedule =(date) => {
    let formattedDate = moment(date).startOf('day').valueOf();
    this.setState({
      CurrentDate: formattedDate,
    });
  }

  handleOpenModalRemedy =(item) => {
    let data ={
      email : item.PatientData.email,
      PatientName : item.PatientData.firstName,
      patientId : item.patientId,
      date : item.date,
      timeType : item.timeType,
      doctorId : item.doctorId
    }

    this.setState({
      isOpenModal : true,
      dataModal : data
    })
  }

  toggleModal =() => {
    this.setState({
      isOpenModal : !this.state.isOpenModal
    })
  }

  CloseRemedy =() => {
    this.setState({
      isOpenModal : false,
      dataModal : {}
    })
  }

  SendRemedy =async(data) => { 
    console.log(data);
    let response =  await SendRemedyPatient({
      doctorId : data.dataParent.doctorId,
      date : data.dataParent.date,
      PatientName : data.dataParent.PatientName,
      timeType : data.dataParent.timeType,
      patientId : data.dataParent.patientId,
      language : this.props.language,
      email : data.email,
      imageBase64  : data.imageBase64
    })
    if(response && response.errCode ===0) {
        toast.success(response.message);
        this.setState({
        isOpenModal : false
        })
        await this.FetchDataListPatient();
    }
    else {
      toast.error(response.message);
    }
  }


  render() {
    let {PatientData} = this.state;
    console.log(PatientData);
    return (
      <Fragment>
        <RemedyPatient 
        isOpen={this.state.isOpenModal}
        isOpenModal={this.toggleModal}
        dataModal={this.state.dataModal}
        CloseRemedy={this.CloseRemedy}
        SendRemedy={this.SendRemedy}
        />
        <div className="title_container">
           <h3 className="text-center mt-4"><FormattedMessage id="menu.doctor.doctor_patient"/></h3>
        </div>
        <div className="container-body container">
            <div className="col-6 form-group mb-3">
              <label className="title_left">Chọn Ngày : </label>
              <DatePicker
                selected={this.state.CurrentDate}
                onChange={this.handleChangeDateSchedule}
                className="form-control"
              />
            </div>
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Họ và Tên</th>
                <th scope="col">Thời Gian</th>
                <th scope="col">Số Điện Thoại</th>
                <th scope="col">Giới Tính</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {PatientData && !_.isEmpty(PatientData) ?
              PatientData.map((item,index) => {
                return (
                  <tr className={index % 2 === 0 ? "table-primary" : "table-danger"} 
                  key={index}>
                  <th scope="row">{item.patientId}</th>
                  <td >{item.PatientData.firstName}</td>
                  <td>{item.Time.valueVi}</td>
                  <td>{item.PatientData.phoneNumber}</td>
                  <td>{item.PatientData.genderData.valueVi}</td>
                  <td colSpan="1" className="d-flex flex-md-row gap-3 ">
                    <button 
                    onClick={() => this.handleOpenModalRemedy(item)}
                    className="mr-2 btn btn-info mr2">Xác nhận</button>
                  </td>

                </tr>
                )
              }) :<tr>No Data Render</tr>
              }
             
            </tbody>
          </table>
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
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo : state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect( mapStateToProps,mapDispatchToProps)(ManagerPatientList);
