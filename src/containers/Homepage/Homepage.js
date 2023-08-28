import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import MediaSpecialty from './Section/MediaSpecialty';
import MedicalFacility from './Section/MedicalFacility';
import FeaturedDoctor from './Section/FeaturedDoctor';
class Homepage extends Component {

    render() {

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };
        return (
            <div>
                <HomeHeader isshowBanner={true} />
                <Specialty settings={settings} />
                <MediaSpecialty settings={settings} />
                <MedicalFacility settings={settings}/>
                <FeaturedDoctor settings={settings}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
