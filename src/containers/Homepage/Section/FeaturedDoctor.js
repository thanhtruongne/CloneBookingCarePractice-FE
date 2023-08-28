import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./FeaturedDoctor.scss";
import * as actions from "../../../store/actions/adminAction";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGE } from "../../../utils";




class FeaturedDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorHomepage: [],
    };
  }

  async componentDidMount() {
    await this.props.getDoctorTopHomepage();

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.DoctorHomepage !== this.props.DoctorHomepage) {
      this.setState({
        arrDoctorHomepage: this.props.DoctorHomepage.dataResponse,
      });
    }
  }

  handleGetDetailView = (id) => {
       //push giống với redirect (khi click link tới url 
     this.props.history.push(`/doctor-detail/${id}`)
  }

  render() {
    let DoctorTop = this.state.arrDoctorHomepage;
    DoctorTop = DoctorTop.concat(DoctorTop).concat(DoctorTop);
    console.log(DoctorTop);

    return (
      <div className="FeaturedDoctor">
        <div className="section-content">
          <div className="section_wrapper">
            <div className="Title_slider">
              <h2>Bác sĩ nổi bật tuần qua</h2>
              <button className="btn_loadmore">Xem thêm</button>
            </div>
            <Slider {...this.props.settings}>
              {DoctorTop &&
                DoctorTop.map((item, index) => {
                  let nameVi = `${item.postisionData.valueVi},${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.postisionData.valueEn},${item.firstName} ${item.lastName}`;

                  let imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );

                  return (
                    <div className="content_doctor-featured" key={index}>
                      <div className="content-image"
                      onClick={() => this.handleGetDetailView(item.id)}
                      >
                        <div className="Image">
                          <img src={imageBase64} />
                        </div>
                        <h3>
                          {this.props.language === LANGUAGE.VI
                            ? nameVi
                            : nameEn}
                        </h3>
                        <h4>
                          <span>Sản phụ khoa</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    DoctorHomepage: state.admin.arrDoctorHomePageLimit,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorTopHomepage: () => dispatch(actions.fetchDoctorHomePage()),
  };
};
//dùng withRouter wrapper all 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor)) ;
