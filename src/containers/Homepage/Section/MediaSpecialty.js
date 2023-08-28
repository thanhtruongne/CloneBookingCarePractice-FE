import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MediaSpecialty.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MediaSpecialty extends Component {



    render() {
        return (
            <div className='section-specialty backGroup-fff'>
                <div className='section-content'>
                    <div className='section_wrapper'>
                        <div className='Title_slider'>
                            <h2>Bác sĩ từ xa qua Video</h2>
                            <button className='btn_loadmore'>Xem thêm</button>
                        </div>
                        <Slider {...this.props.settings}>
                            <div className='content_wrapper camera_icon'>
                                <div className='content-image'>
                                    <div className='image_about'
                                        style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fr/w300/2019/05/31/170831kham-tim-mach-4.jpg')" }}
                                    ></div>
                                    <h3>Bác sĩ Tim mạch từ xa</h3>
                                </div>
                            </div>
                            <div className='content_wrapper camera_icon'>
                                <div className='content-image'>
                                    <div className='image_about'
                                        style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fr/w300/2017/12/19/173328kham-nhi-khoa.jpg')" }}
                                    ></div>
                                    <h3>Bác sĩ Nhi từ xa</h3>
                                </div>
                            </div>
                            <div className='content_wrapper camera_icon'>
                                <div className='content-image'>
                                    <div className='image_about'
                                        style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fr/w300/2018/08/18/095722tai-mui-hong.jpg')" }}
                                    ></div>
                                    <h3>Bác sĩ Tai-Mũi-Họng từ xa</h3>
                                </div>
                            </div>
                            <div className='content_wrapper camera_icon'>
                                <div className='content-image'>
                                    <div className='image_about'
                                        style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fr/w300/2018/08/09/184703noi-tiet.jpg')" }}
                                    ></div>
                                    <h3>Bác sĩ Nội tiết từ xa</h3>
                                </div>
                            </div>
                            <div className='content_wrapper camera_icon'>
                                <div className='content-image'>
                                    <div className='image_about'
                                        style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fr/w300/2019/10/03/100739bac-si-than-kinh.jpg')" }}
                                    ></div>
                                    <h3>Bác sĩ Thần kinh từ xa</h3>
                                </div>
                            </div>
                            <div className='content_wrapper camera_icon'>
                                <div className='content-image'>
                                    <div className='image_about'
                                        style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fr/w300/2019/10/03/100739bac-si-than-kinh.jpg')" }}
                                    ></div>
                                    <h3>Bác sĩ Thần kinh từ xa</h3>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaSpecialty);
