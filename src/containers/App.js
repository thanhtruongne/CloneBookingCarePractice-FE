import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch ,BrowserRouter} from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Homepage from './Homepage/Homepage'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import DoctorSchedule from './System/Doctor/DoctorSchedule';
import BookingAppointments from './Patient/Doctor/BookingAppointments';
import DetailClinic from './Patient/Doctor/DetailClinic';
import VertifyBookingSchedules from './Patient/Doctor/VertifyBookingSchedules';
import SpecialtysDoctorDetail from'./Patient/Doctor/SpecialtysDoctorDetail';
import Doctor from '../routes/Doctor';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            {/* Scrollcustombar sử dụng thanh trượt theo height của element */}
                            <CustomScrollbars style={{height : '100vh', width:'100%'}}>
                            <BrowserRouter>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.DOCTOR_SCHEDULE} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.HOMEPAGE} component={Homepage} />
                                {/* Tạo url detaildoctor  */}
                                <Route path={path.DOCTOR_DETAIL}  component={DetailDoctor} />
                                <Route path={path.BOOKING_APPOINTMENTS} component={BookingAppointments} />
                                <Route path={path.VERTIFY_BOOKING_SCHEDULES} component={VertifyBookingSchedules} />
                                <Route path={path.SPECIALTYS_DOCTOR} component={SpecialtysDoctorDetail}/>
                                <Route path={path.CLINIC_DOCTOR} component={DetailClinic} />
                            </Switch>
                            </BrowserRouter>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);