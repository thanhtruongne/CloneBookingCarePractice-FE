import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import _, { result } from "lodash";
import { LANGUAGE } from "../../../utils";
import {PostSchedulesTimeDoctor} from '../../../services/userServices'
import * as actions from "../../../store/actions/index";
import Select from "react-select";
import "./DoctorSchedule.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { toast,ToastContainer } from "react-toastify";
import { dateFormat } from "../../../utils";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      GetData: [],
      CurrentDate: new Date(),
      TimeSchedule : []
    };
  }

  async componentDidMount() {
    await this.props.ListAlldoctor();
    await this.props.AllcodeTimeSCHEDULES();

  }

  handleBulidOptionSelect = (data) => {
    let results = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        obj.value = item.id;
        let nameVi = `${item.firstName} ${item.lastName}`;
        let nameEn = `${item.lastName} ${item.firstName} `;
        obj.label = LANGUAGE.VI === this.props.language ? nameVi : nameEn;
        results.push(obj);
      });
    }
    return results;
  };
 async componentDidUpdate(prevProps, prevState) {
    if (prevProps.AllDoctor !== this.props.AllDoctor) {
      let dataset =  this.handleBulidOptionSelect(this.props.AllDoctor);
      this.setState({
        GetData: dataset,
      });
    }
    if (prevProps.AllcodeTimeSchedules != this.props.AllcodeTimeSchedules) {
      let data = await this.props.AllcodeTimeSchedules;
      // set map add isSelected into data;
      if(data && data.length > 0) {
         data.map(item => {
          item.isSelected=false
          return item;
        })
      }
      this.setState({
        TimeSchedule: data,
      });
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleChangeDateSchedule = (date) => {
    this.setState({
      CurrentDate: date,
    });
  };

  
  handleClickTime = (time) => {
    let {TimeSchedule} = this.state;
    if(TimeSchedule && TimeSchedule.length > 0 ) {
      TimeSchedule.map((item,index) => {
        if(time.id === item.id) {
          item.isSelected = !item.isSelected
          return item;
        }
      })
    }
  }
  
  handleLoginSave = async() => {
    let {TimeSchedule,selectedOption,CurrentDate} = this.state;
    let results = [];
    if(!CurrentDate) {
      toast.error('Missing parameter invalid date');
      return;
    }
    if(selectedOption && _.isEmpty(selectedOption)) {
      toast.error('Missing parameter invalid Doctor');
      return;
    }
    // let formattedDate = new Date(CurrentDate).getTime();
      let formattedDate = moment(CurrentDate).startOf('day').valueOf();
      if(TimeSchedule && TimeSchedule.length > 0) {
      let selectTime = TimeSchedule.filter(item => item.isSelected === true);
      if(selectTime && selectTime.length > 0) {
        selectTime.map((item,index) => {
          let arr = {};
          arr.doctorId = selectedOption.value;
          arr.date = formattedDate;
          arr.timeType = item.keyMap;
          results.push(arr);
        })

      }else{
        toast.error('Invalid TIME');
        return;
      }
    }
    
    await PostSchedulesTimeDoctor({
       results,
      date : formattedDate,
      doctorId : selectedOption.value 
    })
    console.log('result',results)
  }

  render() {
    let { GetData,TimeSchedule } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <h2 className="text-center mt-4">
              <FormattedMessage id="menu.doctor.title" />
            </h2>
            <div className="wrapper_title-input">
              <div className="content_left">
                <label className="title_left">Chọn bác sĩ : </label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.GetData}
                />
              </div>
              <div className="content_right col-6 form-group">
                <label className="title_left">Chọn ngày : </label>
                <DatePicker
                  selected={this.state.CurrentDate}
                  onChange={this.handleChangeDateSchedule}
                  className="form-control"
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="Time_choose mt-4 mb-3">
              <h4 className="text-info text-left mb-4">
                <FormattedMessage id="menu.doctor.Choose_time" />
              </h4>
              <div className="Wrapper">
               {TimeSchedule && TimeSchedule.length > 0 && 
               TimeSchedule.map((item,index) => {
                return (
                  <button className={item.isSelected === true ? "btn btn-warning" : "btn btn-light"}              
                  key={index}
                  onClick={() => this.handleClickTime(item)}
                  >
                     {LANGUAGE.VI === this.props.language ? item.valueVi  : item.valueEn}
                  </button>
                )
               })
               }
              </div>
            </div>

            <div>
              <button
                className="btn btn-primary"
               onClick={() =>this.handleLoginSave()}
              >
                <FormattedMessage id="menu.doctor.Save" />
              </button>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    AllDoctor: state.admin.ListAllDoctor,
    language: state.app.language,
    AllcodeTimeSchedules : state.admin.AllcodeTimeSchedules
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ListAlldoctor: () => dispatch(actions.fetchAllDoctor()),
    AllcodeTimeSCHEDULES : () => dispatch(actions.fetchAllcodesSchedulesTime())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
