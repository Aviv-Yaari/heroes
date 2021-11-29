import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/system.actions';
import { login, signup } from '../store/user.actions';

export function AuthPage() {
  const [page, setPage] = useState<'login' | 'signup'>('login');
  const [values, setValues] = useState({ username: '', fullname: '', password: '' });
  const dispatch = useDispatch();

  const handleChangePage = () => {
    if (page === 'login') setPage('signup');
    else setPage('login');
    setValues({ username: '', fullname: '', password: '' });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    setValues(values => ({ ...values, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    const { username, fullname, password } = values;
    try {
      if (page === 'login') {
        dispatch(login(username, password));
        dispatch(setAlert({ message: 'Logged in successfuly', type: 'success' }));
      } else {
        dispatch(signup(username, fullname, password));
        dispatch(setAlert({ message: 'Signed up successfuly', type: 'success' }));
      }
    } catch (err) {
      dispatch(setAlert({ message: err as string, type: 'error' }));
    }
  };

  return (
    <div className="container">
      <form className="content flex column align-center auth-page" onSubmit={handleSubmit}>
        <h2>{page.charAt(0).toUpperCase() + page.slice(1)} to Heroes</h2>
        <input name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
        {page === 'signup' && (
          <input name="fullname" type="text" placeholder="Full name" value={values.fullname} onChange={handleChange} />
        )}
        <button className="full-width">Continue</button>
        {page === 'login' ? (
          <p>
            Not a member yet?
            <button type="button" className="btn-link" onClick={handleChangePage}>
              Join now
            </button>
          </p>
        ) : (
          <p>
            Already a member?
            <button type="button" className="btn-link" onClick={handleChangePage}>
              Log in
            </button>
          </p>
        )}
        <button type="button" className="btn-link" onClick={() => dispatch(login('avivyar', 'Aviv!!1234'))}>
          Easy login - dev porpuses
        </button>
        <button type="button" className="btn-link" onClick={() => dispatch(login('admin', 'Admin!!1234'))}>
          Easy admin login - dev porpuses
        </button>
      </form>
    </div>
  );
}
