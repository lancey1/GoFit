import React from "react";
import Grid from '@material-ui/core/Grid';

import meme_logo from '../../images/memestagram.png'

import './signup.css'

function Signup() {
  return (
    <main id="main-signup">
      <form action="/signup" method="post">
      <div>
      <Grid container>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <div className="signup_main">
            <div>
              <div className="signup_right_component">
                <img className="signup_logo" src={meme_logo} alt="" />
                  <div className="signup_signin">
                    <input className="signup_text" type="email" placeholder="Email" /> 
                    <input className="signup_text" type="text" placeholder="Full Name" /> 
                    <input className="signup_text"type="text" placeholder="Username" /> 
                    <input className="signup_text" type="password" placeholder="Password" />
                    <button className="signup_button">Register</button>
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

export default Signup;
