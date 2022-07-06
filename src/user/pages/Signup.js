import React from "react";

function Signup() {
  return (
    <main id="main-signup">
      <form action="/signup" method="post">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" value="" />
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="" />

        <label for="password">Password</label>
        <input type="password" name="password" id="password" />

        <label for="confirm_password">Confirm password</label>
        <input type="password" name="confirm_password" id="confirm_password" />
        <button>Register</button>
      </form>
    </main>
  );
}

export default Signup;
