import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tabs';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Profile.css';
import AuthService from "../services/auth.service";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: "",
            newPassword1: "",
            newPassword2: "",
            successful: false,
            message: ""
        }
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeNewPasswor1 = this.onChangeNewPasswor1.bind(this);
        this.onChangeNewPasswor2 = this.onChangeNewPasswor2.bind(this);
    }

    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        });
    }

    onChangeNewPasswor1(e) {
        this.setState({
            newPassword1: e.target.value
        });
    }

    onChangeNewPasswor2(e) {
        this.setState({
            newPassword2: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false,
        });

        if (this.state.newPassword1 === this.state.newPassword2) {
            this.setState({
                alert: false
            });
            AuthService.changePassword(
                this.props.myHookValue,
                this.state.oldPassword,
                this.state.newPassword1
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                }, error => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
          
                    this.setState({
                      loading: false,
                      successful: false,
                      message: resMessage
                    });
                  }
            )
        } else {
            this.setState({
                alert: true,
                message: "Password must be duplicated",
            });
        }
    }

    render() {
        return (
            <>
                <h1>Profile</h1>
                <div>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="Change Password">
                            <div >
                                <Form className="form_changepass" onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label> Old Password</Form.Label>
                                        <Form.Control type="password" placeholder="Old Password" value={this.state.oldPassword} onChange={this.onChangeOldPassword} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="New Password" value={this.state.newPassword1} onChange={this.onChangeNewPasswor1} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="New Password" value={this.state.newPassword2} onChange={this.onChangeNewPasswor2} />
                                    </Form.Group>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div
                                                className={
                                                    this.state.successful
                                                        ? "alert alert-success"
                                                        : "alert alert-danger"
                                                }
                                                role="alert"
                                            >
                                                {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    <Button variant="dark" type="submit">
                                        Change Password
                                    </Button>
                                </Form>
                            </div>

                        </Tab>
                    </Tabs>
                </div>

            </>

        )
    }
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useParams();
        return <Component {...props} myHookValue={myHookValue.username} />;
    }
}

export default withMyHook(Profile)