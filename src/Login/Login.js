import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'; //../Register/Register
import TextField from '@material-ui/core/TextField';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';


import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/api/";
        var self = this;
        var payload = {
            "email": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    console.log("Login successfull");
                    var uploadScreen = [];
                    //uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
                else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" color="inherit">
                                    Sign In
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <form noValidate autoComplete="off">
                            <TextField
                                defaultValue="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            
                            <br />
                            <TextField
                                type="password"
                                varient="outlined"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <MuiThemeProvider theme={theme}>
                                <Button variant="contained" color="primary">
                                    Log in
                            </Button>
                            </MuiThemeProvider>
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const theme = createMuiTheme({
    palette: {
        primary: purple,
    },
    typography: {
        useNextVariants: true,
    },
});

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default Login;