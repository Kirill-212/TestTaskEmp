import React, { useEffect } from "react";
import {
  UserApi,
  RoleApi,
  GetRoleDto,
  PutUserDto
} from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PutUser(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roleList, setRoleList] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  async function Put(e) {
    e.preventDefault();
    new UserApi().apiUserPut(
      {
        body: new PutUserDto(
          email,
          role,
          password.length === 0 ? null : password
        )
      },
      CallbackRequest,
      CallabackPut,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackPut() {
    setRedirect(true);
  }

  async function GetRoleList() {
    new RoleApi().apiRoleGet(
      {},
      CallbackRequest,
      Callaback,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function Callaback(data) {
    setRoleList(
      data.map(e => {
        return GetRoleDto.constructFromObject(e);
      })
    );
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setEmail(query.get("email"));
    setRole(query.get("roleName"));
    GetRoleList();
  }, []);

  return (
    <div className="container  bg-secondary position-absolute top-50 start-50 translate-middle w-25 shadow-lg p-3 mb-5 rounded ">
      {redirect && <Navigate to={"/"} />}
      <form onSubmit={Put}>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <input
              disabled
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              value={email}
              required
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <label for="floatingInput">Email</label>
          </div>
          <div className="col form-group">
            <select
              className="form-select h-100 w-100"
              id="floatingInput"
              size="1"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              placeholder="Role"
            >
              <option value={role}>
                {role}
              </option>
              {roleList.map(element => {
                if (element.roleName !== role)
                  return (
                    <option value={element.roleName}>
                      {element.roleName}
                    </option>
                  );
              })}
            </select>
          </div>
        </div>
        <div className="row mb-1 justify-content-center">
          <div className="col form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
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
      </form>
    </div>
  );
}
