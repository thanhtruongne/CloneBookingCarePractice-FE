import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGE } from "../../../utils";
import { fetchDoctorInfomationsSchedules } from "../../../store/actions/adminAction";
import {GetDoctorInfomationSchedules} from '../../../services/userServices'
import { NumericFormat } from 'react-number-format';
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowHideTable : false,
       DataDoctor : []
    };
  }

  async componentDidMount() {
    let dataValue = await GetDoctorInfomationSchedules(this.props.DoctorInfoId);
    if(dataValue && dataValue.errCode === 0) {
      this.setState({
        DataDoctor : dataValue.data
      })
    }
  }

  async componentDidUpdate(prevProps,prevState) {
  }

  render() {
    let {DataDoctor} = this.state;
    let {language} = this.props;
    console.log(DataDoctor);
    return (
    <div className="content_info_doctor">
        <div className="address_clinic">
              <h3 className="title_clinic">ĐỊA CHỈ KHÁM</h3>
              <div className="clinic">{DataDoctor.nameClinic === null ? ' ' : DataDoctor.nameClinic }</div>
              <div className="address" >{DataDoctor.addressClinic === null  ? '' : DataDoctor.addressClinic}</div>
        </div>
        <div className="price_clinic">
          <h3 className="title_price">GIÁ KHÁM : </h3>
          {DataDoctor &&  DataDoctor.PriceData && language === LANGUAGE.VI
          &&  <NumericFormat 
                value={DataDoctor.PriceData.valueVi}
                thousandSeparator ={true}
                suffix={'VND'}
                displayType = {'text'}
                class='currency'
                />
          }
           {DataDoctor &&  DataDoctor.PriceData && language === LANGUAGE.EN
          &&  <NumericFormat 
                value={DataDoctor.PriceData.valueEn}
                thousandSeparator ={true}
                suffix={'$'}
                displayType = {'text'}
                class='currency'
                />
          }
           <span className="click_more">Xem chi tiết</span>
         
        </div>
    </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    DataDoctorInfomationsSchedules : state.admin.DataDoctorInfomationsSchedules
  };
};
// sử dụng dispatch trong hàm này để sử dụng redux
const mapDispatchToProps = (dispatch) => {
  return {
    GetDataDoctorInfomationSchedules : (doctorId) => dispatch(fetchDoctorInfomationsSchedules(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
