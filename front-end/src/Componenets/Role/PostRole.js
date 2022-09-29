import * as React from "react";
import { RoleApi, PostRoleDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PostRole(props) {
  const [roleName, setRoleName] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  async function Post(e) {
    e.preventDefault();
    new RoleApi().apiRolePost(
      {
        body: new PostRoleDto(roleName)
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
  
  return (
    <div className="container  bg-secondary position-absolute top-50 start-50 translate-middle w-25 shadow-lg p-3 mb-5 rounded ">
      {redirect && <Navigate to={"/"} />}
      <form onSubmit={Post}>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="role name"
              required
              onChange={e => {
                setRoleName(e.target.value);
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
