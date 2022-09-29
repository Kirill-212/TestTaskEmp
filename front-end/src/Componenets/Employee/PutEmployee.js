import React, { useEffect } from "react";
import {
  RoleApi,
  GetRoleDto,
  PositionApi,
  EmployeeApi,
  PutEmployeeDto,
  GetPositionDto
} from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PutEmployee(props) {
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [positionList, setPositionList] = React.useState([]);
  const [roleList, setRoleList] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  async function Put(e) {
    e.preventDefault();
    new EmployeeApi().apiEmployeePut(
      {
        body: new PutEmployeeDto(email, address, position, role)
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
      CallabackRoleList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackRoleList(data) {
    setRoleList(
      data.map(e => {
        return GetRoleDto.constructFromObject(e);
      })
    );
  }

  async function GetPositionList() {
    new PositionApi().apiPositionGet(
      {},
      CallbackRequest,
      CallabackPositionList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackPositionList(data) {
    setPositionList(
      data.map(e => {
        return GetPositionDto.constructFromObject(e);
      })
    );
  }

  async function GetEmployee(email) {
    new EmployeeApi().apiEmployeeByEmailGet(
      { email: email },
      CallbackRequest,
      CallabackEmployee,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackEmployee(data) {
    setAddress(data.address);
    setRole(data.roleName);
    setPosition(data.positionName);
    GetRoleList();
    GetPositionList();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setEmail(query.get("email"));
    GetEmployee(query.get("email"));
  }, []);

  return (
    <div className="container  bg-secondary position-absolute top-50 start-50 translate-middle w-25 shadow-lg p-3 mb-5 rounded ">
      {redirect && <Navigate to={"/"} />}
      <form onSubmit={Put}>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <input
              disabled
              value={email}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              required
            />
            <label for="floatingInput">Email</label>
          </div>
          <div className="col form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Address"
              required
              value={address}
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
            <label for="floatingInput">Address</label>
          </div>
        </div>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-group">
            <select
              className="form-select h-100 w-100"
              id="floatingInput"
              size="1"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
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
          <div className="col form-group">
            <select
              className="form-select w-100 h-100"
              id="floatingInput"
              size="1"
              value={position}
              onChange={e => setPosition(e.target.value)}
              required
            >
              <option value={position}>
                {position}
              </option>
              {positionList.map(element => {
                if (element.name !== position)
                  return (
                    <option value={element.name}>
                      {element.name}
                    </option>
                  );
              })}
            </select>
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
