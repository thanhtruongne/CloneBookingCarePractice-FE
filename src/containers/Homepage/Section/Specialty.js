import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleQuestion, faSearch } from '@fortawesome/free-solid-svg-icons'
import './Specialty.scss'
import { GetDoctorSpecialtysAppointmentAll } from '../../../services/userServices';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//sử dụng FormarttedMessage của react-until
import { FormattedMessage } from 'react-intl'

class Specialty extends Component {
   constructor(props) {
        super(props);
        this.state = {
             Specialty :[]
        }
   }

   async componentDidMount() {
        let DoctorSpecialty = await GetDoctorSpecialtysAppointmentAll('All');
        if(DoctorSpecialty && DoctorSpecialty.errCode === 0) {
            this.setState({
                Specialty : DoctorSpecialty.data
            })
        }
    }
    handleRedirectToDetailSpecialtys =(item) => {
        this.props.history.push(`/specialtys-doctors/${item.id}`)
    }

    render() {
         let  { Specialty } = this.state;  
         console.log('Specialty',Specialty)  
        return (
            <div className='section-specialty'>
                <div className='section-content'>
                    <div className='section_wrapper'>
                        <div className='Title_slider'>
                            <h2>Chuyên khoa phổ biến</h2>
                            <button className='btn_loadmore'>Xem thêm</button>
                        </div>
                    <Slider {...this.props.settings}>
                        {Specialty && Specialty.map((item,index) => {
                            return (
                                <div className='content_wrapper' key={index}
                                onClick={() => this.handleRedirectToDetailSpecialtys(item)}
                                >
                                    <div className='content-image'>
                                    <div className='image_about'
                                        style={{backgroundImage:`url(${item.image})`}}
                                        ></div>
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};
// sử dụng dispatch trong hàm này để sử dụng redux
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
