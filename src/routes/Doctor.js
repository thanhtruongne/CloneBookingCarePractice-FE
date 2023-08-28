import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import DoctorSchedule from '../containers/System/Doctor/DoctorSchedule';
import ManagerPatientList from '../containers/System/Doctor/ManagerPatientList';
class Doctor extends Component {
    render() {
        const {  isLoggedIn } = this.props;
        return (

            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch> 
                            <Route path="/doctor/doctor-schedule" exact component={DoctorSchedule} />
                            <Route path="/doctor/patient-schedule" component={ManagerPatientList} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
