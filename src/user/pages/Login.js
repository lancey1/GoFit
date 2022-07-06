import React from "react";

function Login() {
  return (
    <main id="main-login">
    <form action="/login" method="post">
      <label for="email">Email</label>
      <input type="email" name="email" id="email"/>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
      <button>Login</button>
    </form>
    </main>
  );
}

export default Login;
