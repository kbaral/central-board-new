import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

import Icon from '@material-ui/core/Icon';

import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import Login from '../Login/Login';

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    typography: { useNextVariants: true },
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/api/";
        console.log("values", this.state.first_name, this.state.last_name, this.state.email, this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + '/register', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    //  console.log("registration successfull");
                    var loginscreen = [];
                    loginscreen.push(<Login parentContext={this} />);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        //  const { classes } = props;
        return (
            <div>

                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Register
                             </Typography>
                        </Toolbar>
                    </AppBar>
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange={(event, newValue) => this.setState({ first_name: newValue })}
                        />

                        <br />
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange={(event, newValue) => this.setState({ last_name: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                    </MuiThemeProvider>
                    <Button variant="contained" size="small" className={styles.button} style={styles} onClick={(event) => this.handleClick(event)} >

                        Save
                         </Button>
                    <Button label="Submit" primary={true} />
                </div>

            </div>
        );
    }
}

export default Register;