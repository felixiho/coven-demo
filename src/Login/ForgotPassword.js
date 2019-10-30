import React from 'react';
import Grid from '@material-ui/core/Grid'; 
import FormControl from '@material-ui/core/FormControl'; 
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'; 
import './index.css'

const ForgotPassword =
    () => { 
 
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
                                <h1>Forgot Password</h1>
                                <p className="subText">
                                    Enter email to get a link.
                                </p>
                                <form noValidate >  
                                     <FormControl className="form-item">
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input id="email" type="email" />
                                         
                                    </FormControl> 
                                    <FormControl className="form-item botton-parent">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="botton"  
                                            type="submit" 
                                        >
                                        Send</Button>
                                    </FormControl>
                                </form>
                            </div>
                         </Grid>
                    </Grid>
                
            </div>
        );
    }



export default ForgotPassword;