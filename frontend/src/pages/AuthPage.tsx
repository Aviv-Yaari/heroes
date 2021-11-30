import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormField } from '../components/FormField';
import { userService } from '../services/user.service';
import { setAlert } from '../store/system.actions';
import { login, signup } from '../store/user.actions';

export function AuthPage() {
  const [page, setPage] = useState<'login' | 'signup'>('login');
  const [values, setValues] = useState({ username: '', fullname: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({ username: [], fullname: [], password: [] });
  const dispatch = useDispatch();
  const isErrros = errors.username.length || errors.fullname.length || errors.password.length;

  const handleChangePage = () => {
    if (page === 'login') setPage('signup');
    else setPage('login');
    setValues({ username: '', fullname: '', password: '' });
    setErrors({ username: [], fullname: [], password: [] });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    setValues(values => {
      const { username, fullname, password } = values;
      if (isErrros) {
        const errors = userService.checkRegistration({
          username,
          fullname,
          password,
          [ev.target.name]: ev.target.value,
        });
        setErrors(errors);
      }
      return { ...values, [ev.target.name]: ev.target.value };
    });
  };

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    const { username, fullname, password } = values;
    try {
      if (page === 'login') {
        await dispatch(login(username, password));
        dispatch(setAlert({ message: 'Logged in successfuly', type: 'success' }));
      } else {
        const errors = userService.checkRegistration({ ...values });
        if (errors.username.length || errors.fullname.length || errors.password.length) return setErrors(errors);
        await dispatch(signup(username, fullname, password));
        dispatch(setAlert({ message: 'Signed up successfuly', type: 'success' }));
      }
    } catch (err) {
      let { message = 'Could not log in' } = err as Error;
      if (message === '401') message = 'Invalid username / password';
      dispatch(setAlert({ message: page === 'login' ? message : 'Could not sign up', type: 'error' }));
    }
  };

  const handleEasyLogin = async (username: string, password: string) => {
    try {
      await dispatch(login(username, password));
    } catch (err) {
      dispatch(setAlert({ message: 'An error occured, please try again later', type: 'error' }));
    }
  };

  return (
    <div className="container">
      <form className="content flex column align-center auth-page" onSubmit={handleSubmit}>
        <h2>{page.charAt(0).toUpperCase() + page.slice(1)} to Heroes</h2>
        <FormField
          name="username"
          type="text"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          errors={errors.username}
        />
        <FormField
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          errors={errors.password}
        />
        {page === 'signup' && (
          <FormField
            name="fullname"
            type="text"
            placeholder="Full name"
            value={values.fullname}
            onChange={handleChange}
            errors={errors.fullname}
          />
        )}
        <button className={`full-width ${isErrros ? 'disabled' : ''}`}>Continue</button>
        <p>
          {page === 'login' ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" className="btn-link" onClick={handleChangePage}>
            {page === 'login' ? 'Join now' : 'Log in'}
          </button>
        </p>
        {/* "For dev": */}
        <button type="button" className="btn-link" onClick={() => handleEasyLogin('avivyar', 'Aviv!!1234')}>
          Easy login - dev purposes
        </button>
        <button type="button" className="btn-link" onClick={() => handleEasyLogin('admin', 'Admin!!1234')}>
          Easy admin login - dev purposes
        </button>
        {/* End of "For dev" */}
      </form>
    </div>
  );
}
