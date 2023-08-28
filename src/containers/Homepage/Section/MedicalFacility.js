import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './MedicalFacility.scss'
import { GetAllClinics } from '../../../services/userServices';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            DetailCinic : []
        }
    }

    async componentDidMount() {
      let Clinic = await GetAllClinics();
      if(Clinic && Clinic.errCode === 0) {
        this.setState({
            DetailCinic : Clinic.data
        })
      }
    }
    
    handleRedirectTRoClinicDetail =(id) => {
        this.props.history.push(`/clinics-doctor/${id}`)
    }

    render() {
        let {DetailCinic} = this.state;
        console.log(DetailCinic);
        return (
            <div className='section-specialty'>
                <div className='section-content'>
                    <div className='section_wrapper'>
                        <div className='Title_slider'>
                            <h2>Cơ sở y tế nổi bật</h2>
                            <button className='btn_loadmore'>Xem thêm</button>
                        </div>
                        <Slider {...this.props.settings}>
                            {DetailCinic && DetailCinic.length > 0 && 
                            DetailCinic.map((item,index) => {
                               return (
                            <div className='content_wrapper' key={index}
                            onClick={() => this.handleRedirectTRoClinicDetail(item.id)}
                            >
                                <div className='content-image'>
                                <div className='Image' style={{backgroundImage:`url(${item.image})`}} >
                                    </div>
                                    <h3>{item.name}</h3>
                                </div>
                            </div>
                               )
                            })
                            }
                         
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
