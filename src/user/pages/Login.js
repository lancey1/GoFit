import React from "react";
import Grid from '@material-ui/core/Grid';

import phone_img from '../../images/9364675fb26a.svg';
import meme_logo from '../../images/memestagram.png'

import './login.css'

function Login() {
  return (
    <main id="main-login">
    <form action="/login" method="post">
      <div>
        <Grid container>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <div className="main-login-page">
              <div>
                <img src={phone_img} width="454px" alt="" />
              </div>
              <div>
                <div className="login_right_component">
                  <img className="login_logo" src={meme_logo} alt="" />
                    <div className="login_signin">
                      <input className="login_text" type="text" placeholder="Username or Email" /> 
                      <input className="login_text" type="password" placeholder="Password" />
                      <button className="login_button">Login</button>
                    </div>
                  </div>
                <div>
              </div>
            </div>
          </div>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>     
        </div>
    </form>
    </main>
  );
}

export default Login;
