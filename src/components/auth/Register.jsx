import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { toast } from 'react-toastify';

const Register = props => {
  // const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // const { setAlert, removeAlerts } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/',{replace:true});
    }

    if (error) {// === 'User already exists'
      // setAlert(error, 'danger');
      toast.error(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

//   useEffect(()=>{
//     removeAlerts();
//     // eslint-disable-next-line
// },[user])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // removeAlerts();
    if (name === '' || email === '' || password === '') {
      // setAlert('Please enter all fields', 'danger');
      toast.error('Please enter all fields', 'danger');
    }else if (password !== password2) {
      // setAlert('Passwords do not match', 'danger');
      toast.error('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>User Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='e.g. John Doe'
            autoComplete="name"
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            autoComplete="email"
            value={email}
            onChange={onChange}
            placeholder='e.g. john@doe.com'
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
autoComplete="new-password"
            value={password}
            onChange={onChange}
            placeholder='Min 6 characters required'
            
            // minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
autoComplete="new-password"
            value={password2}
            onChange={onChange}
            placeholder='Confirm password'
            
            // minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
      <p>Already get an account? Please <Link to='/login'>Login</Link></p>
    </div>
  );
};

export default Register;
