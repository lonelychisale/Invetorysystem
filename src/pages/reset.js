import React, { useState } from 'react';
import axios from 'axios';
import '../css/reset.css';

function ResetPassword() {
  const inintialvalues = {email:""}
  const [formInput,setFormInputs] = useState(inintialvalues)
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleforminputs = (e) =>{
    const {name,value} = e.target

    setFormInputs({...formInput,[name]:value})

}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput.email)

    try {
      const response = await axios.post('http://localhost:8000/api/sendemail', formInput);
      const status = Number(response.data.status);

      if (status === 200) {
        console.log('email sent successfully');
        setSuccessMessage(response.data.message);
    } else {
        console.log('failed to send reset link');
        setErrorMessage(response.data.message);
    }

    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while sending the reset password link.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="resetPassword">
      <div className="wrapresetpassword">
        <div className="wrappedpassword">
          <form onSubmit={handleFormSubmit}>
            <div className="forminput">
              <label>Enter your email</label>
              <input
                type="email"
                name="email"
                required
                value={formInput.email}
                onChange={handleforminputs}
              />
            </div>
            <div className="resetinput">
              <input type="submit" value="Send" />
            </div>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
