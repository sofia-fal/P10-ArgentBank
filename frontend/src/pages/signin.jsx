import React from 'react';
import Login from '../components/login';
import '../style/signin.css';

function Signin() {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Login />
      </section>
    </main>
  );
}

export default Signin;
