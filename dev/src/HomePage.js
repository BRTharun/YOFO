
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


const styless = {
  
  bodyy: {
    margin: 0,
    height: '100vh',
    background: 'url(https://static.toiimg.com/thumb/64664596.cms?width=680&height=512&imgsize=99309)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    fontFamily: 'poppins',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2: {
    color: 'rgba(255,255,255, 0.75)',
    fontSize: '3em',
    textAlign: 'center',
    marginTop: '20px',
  },
  h3: {
    color: 'rgba(255,255,255, 0.5)',
    fontSize: '4em',
    textAlign: 'center',
    marginTop: '50px',
  },
  login_form: {
    display: 'flex',
    flexDirection: 'column',
    color: '#f6f3f3',
    padding: '40px 26px',
    marginLeft: '750px',
    marginBottom:'200px',
    width: '560px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)'
  },
  login_form_input: {
    color: '#e0dcdc38',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    padding: '14px 16px',
    marginBottom: '30px',
  },
  loginFormButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(30px)',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    letterSpacing: '2px',
    borderRadius: '15px',
    padding: '24px 32px',
    margin: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s ease-in-out',
    
  },
  loginFormButtonHover: {
    background: 'rgba(255, 255, 255, 0.2)',
  },
};

const HomePage = () => {
  const [hoverUserSignup, setHoverUserSignup] = useState(false);
  const [hoverUserSignin, setHoverUserSignin] = useState(false);
  const [hoverDietitianSignup, setHoverDietitianSignup] = useState(false);
  const [hoverDietitianSignin, setHoverDietitianSignin] = useState(false);

  return (
    <div style={styless.html}>
      <div style={styless.bodyy}>
        <h2 style={styless.h2}>Welcome to the Homepage</h2>
        <form className="login_form" style={styless.login_form}>
          <div className="container">
            <div className="action-group">
              <h3 style={styless.login_form_heading}>User Actions</h3>
              <Link to="/user/signup">
                <button
                  className="action-button"
                  style={
                    hoverUserSignup
                      ? { ...styless.loginFormButton, ...styless.loginFormButtonHover }
                      : styless.loginFormButton
                  }
                  onMouseEnter={() => setHoverUserSignup(true)}
                  onMouseLeave={() => setHoverUserSignup(false)}
                >
                  User Signup
                </button>
              </Link>
              <Link to="/user/signin">
                <button
                  className="action-button"
                  style={
                    hoverUserSignin
                      ? { ...styless.loginFormButton, ...styless.loginFormButtonHover }
                      : styless.loginFormButton
                  }
                  onMouseEnter={() => setHoverUserSignin(true)}
                  onMouseLeave={() => setHoverUserSignin(false)}
                >
                  User Signin
                </button>
              </Link>
            </div>
            <div className="action-group">
              <h3 style={styless.login_form_heading}>Dietitian Actions</h3>
              <Link to="/dietitian/signup">
                <button
                  className="action-button"
                  style={
                    hoverDietitianSignup
                      ? { ...styless.loginFormButton, ...styless.loginFormButtonHover }
                      : styless.loginFormButton
                  }
                  onMouseEnter={() => setHoverDietitianSignup(true)}
                  onMouseLeave={() => setHoverDietitianSignup(false)}
                >
                  Dietitian Signup
                </button>
              </Link>
              <Link to="/dietitian/signin">
                <button
                  className="action-button"
                  style={
                    hoverDietitianSignin
                      ? { ...styless.loginFormButton, ...styless.loginFormButtonHover }
                      : styless.loginFormButton
                  }
                  onMouseEnter={() => setHoverDietitianSignin(true)}
                  onMouseLeave={() => setHoverDietitianSignin(false)}
                >
                  Dietitian Signin
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
