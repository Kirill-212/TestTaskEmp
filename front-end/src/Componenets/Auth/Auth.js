import * as React from "react";
import { AuthApi, AuthDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Link, Navigate } from "react-router-dom";

export default function Auth(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  async function Auth(e) {
    e.preventDefault();
    new AuthApi().apiAuthPost(
      {
        body: new AuthDto(email, password)
      },
      CallbackRequest,
      Callaback,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function Callaback(data, response) {
    localStorage.setItem("user", response.text);
    props.setUser(localStorage.getItem("user"));
    setRedirect(true);
  }

  return (
    <div className="container  bg-secondary position-absolute top-50 start-50 translate-middle w-25 h-25 shadow-lg p-3 mb-5 rounded ">
      {redirect && <Navigate to={"/"} />}
      <form onSubmit={Auth}>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              required
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <label for="floatingInput">Email</label>
          </div>
        </div>
        <div className="row mb-1 justify-content-center">
          <div className="col form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <label for="floatingPassword">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
          <div className="col">
            <button type="reset" className="btn btn-danger w-100">
              Cancel
            </button>
          </div>
        </div>
        <div className="row">
          <Link to="/register" className="text-reset navbar-brand">
            register
          </Link>
        </div>
      </form>
    </div>
  );
}
