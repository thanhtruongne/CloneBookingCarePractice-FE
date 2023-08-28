import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./VertifyBookingSchedules.scss";
import { LANGUAGE } from "../../../utils";
import HomeHeader from "../../Homepage/HomeHeader";
import  PropagateLoader  from 'react-spinners/PropagateLoader';
import { VertifyingBookingDoctorSchedules } from "../../../services/userServices";

class VertifyBookingSchedules extends Component {
  constructor(props) {
      super(props);
      this.state = {
        Vertify  : false
    };
    
}


   componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    let token = params.get('token');
    let doctorId = params.get('doctorId');
    setTimeout(async() => {
      let response = await VertifyingBookingDoctorSchedules({
        doctorId:doctorId,
        token : token
      });
      if(response && response.errCode === 0)  {
          this.setState({
              Vertify : true
          })
      }
    },2000)
}
  async componentDidUpdate(prevProps,prevState) {

  }



  render() {
    console.log(this.state.Vertify);
      return (
       <Fragment>
            <HomeHeader ishowBanner={false} />
          <section className="position-relative">
            {this.state.Vertify === true 
            ? <h1 className="text-center text-danger">Xác nhận tạo lịch khám bệnh thành công</h1>
            :   <div className="overplay text-center">
                  <PropagateLoader color="#36d7b7" className="left mt-4 position-absolute top-50" />
                </div>
          }
           

          </section>
       </Fragment>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
       
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(VertifyBookingSchedules);
