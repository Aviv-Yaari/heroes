import React, { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { login, signup } from "../services/auth.service";

export function LoginSignup() {
  const [page, setPage] = useState<"login" | "signup">("login");
  const [values, setValues] = useState({ username: "", fullname: "", password: "" });
  const [error, setError] = useState("");

  const handleChangePage = () => {
    if (page === "login") setPage("signup");
    else setPage("login");
    setError("");
    setValues({ username: "", fullname: "", password: "" });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setValues((values) => ({ ...values, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit: React.FormEventHandler = async (ev) => {
    ev.preventDefault();
    const { username, fullname, password } = values;
    try {
      if (page === "login") {
        await login(username, password);
      } else {
        await signup(username, fullname, password);
      }
      alert("success!");
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div className="login-signup flex justify-center">
      <form className="flex column align-center" onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        <h2>{page.charAt(0).toUpperCase() + page.slice(1)} to Heroes</h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {page === "signup" && (
          <input
            name="fullname"
            type="text"
            placeholder="Full name"
            value={values.fullname}
            onChange={handleChange}
          />
        )}
        <button className="full-width">Continue</button>
        {page === "login" ? (
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
      </form>
    </div>
  );
}
