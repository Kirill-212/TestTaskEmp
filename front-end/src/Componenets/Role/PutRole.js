import React, { useEffect } from "react";
import { RoleApi, PutRoleDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PutRole(props) {
  const [roleName, setRoleName] = React.useState("");
  const [newRoleName, setNewRoleName] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  async function Put(e) {
    e.preventDefault();
    new RoleApi().apiRolePut(
      {
        body: new PutRoleDto(roleName, newRoleName)
      },
      CallbackRequest,
      Callaback,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function Callaback() {
    setRedirect(true);
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setRoleName(query.get("roleName"));
    setNewRoleName(query.get("roleName"));
  }, []);

  return (
    <div className="container  bg-secondary position-absolute top-50 start-50 translate-middle w-25  shadow-lg p-3 mb-5 rounded ">
      {redirect && <Navigate to={"/"} />}
      <form onSubmit={Put}>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={newRoleName}
              placeholder="role name"
              required
              onChange={e => {
                setNewRoleName(e.target.value);
              }}
            />
            <label for="floatingInput">Role name</label>
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
