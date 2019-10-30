import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'; 
import FormControl from '@material-ui/core/FormControl'; 
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {  navigate, Link } from "@reach/router";
import './index.css'

const Login =
    () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [errors, setErrors] = useState([]);
        const [formDisable, setformDisable] = useState(false);


        const handleSubmit = () =>{  
            setformDisable(true);
            setErrors([]);
            let formErrors = []; 
            if(username === "" ){
                formErrors.push("username");
            }
            if (password === ""){
                formErrors.push("password")
            }
            if (formErrors.length < 1){
                setTimeout(()=>{ 
                    setformDisable(false);
                    navigate('/dashboard');
                }, 2000)
            } 
            else{
                setErrors(formErrors);
                setformDisable(false);
            }
        }
        return (
            <div className="parent-container" >
                <Grid
                    container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="parent-login"
                    >
                         <Grid item xs={12} className="mt-20" >
                             <h2>OPEN SKIES</h2>
                         </Grid>
                         <Grid 
                            item lg={4} md={6} xs={11}
                             >
                            <div className="login-box">
                                <h1>Welcome Back</h1>
                                <p className="subText">
                                    Live airspace information for research.
                                </p>
                                <form noValidate >  
                                     <FormControl className="form-item">
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input id="username" type="text" onChange={(e) => setUsername(e.target.value) } />
                                        {
                                            errors.find(error => error === "username")
                                                &&
                                            <span className="form-error"> Username is invalid!</span>
                                        }
                                    </FormControl>
                                    <FormControl className="form-item mt-5">
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input id="password" type="password" onChange={(e) => setPassword(e.target.value) } />
                                        {
                                            errors.find(error => error === "password")
                                                &&
                                            <span className="form-error"> Password is invalid!</span>
                                        }
                                    </FormControl>
                                    <FormControl className="form-item botton-parent">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="botton" 
                                            disabled={formDisable} 
                                            type="submit"
                                            onClick={ handleSubmit}
                                        >
                                        {  formDisable ? <CircularProgress /> : "Login"}</Button>
                                    </FormControl>

                                    <div style={{textAlign: 'center'}}>
                                        <Link to="/">
                                            <span > Forgot Password</span>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                         </Grid>
                    </Grid>
                
            </div>
        );
    }



export default Login;