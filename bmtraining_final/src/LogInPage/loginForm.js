
import React, { useState } from 'react';
import '../SignUpPage/Form';
import FormSignup from './Login';
import FormSuccess from '../SignUpPage/FormSuccess';

const LoginForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    function submitForm() {
      setIsSubmitted(true);
    }
    return (
        <div>
            {/* <h1>Login</h1> */}
            <div className='form-container'>
        
        <div className='form-content-left'>
          <img className='form-img' src='images/form-left2.jpg' alt='leftpic' />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
        </div>
    )
}

export default LoginForm;
