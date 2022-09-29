import React, { useContext, useEffect } from "react";
import {
  UserApi,
  GetUserDto,
  PositionApi,
  EmployeeApi,
  PostEmployeeDto,
  GetPositionDto
} from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PostEmployee(props) {
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [positionList, setPositionList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  async function Post(e) {
    e.preventDefault();
    new EmployeeApi().apiEmployeePost(
      {
        body: new PostEmployeeDto(email, address, position)
      },
      CallbackRequest,
      CallabackPost,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackPost() {
    setRedirect(true);
  }

  async function GetUserList() {
    new UserApi().apiUserNotAddedEmpGet(
      {},
      CallbackRequest,
      CallabackUserList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackUserList(data) {
    setUserList(
      data.map(e => {
        return GetUserDto.constructFromObject(e);
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

  useEffect(() => {
    GetUserList();
    GetPositionList();
  }, []);

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
              placeholder="Address"
              required
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
            <label for="floatingInput">Address</label>
          </div>
          <div className="col form-group">
            <select
              className="form-select w-100 h-100"
              id="floatingInput"
              size="1"
              onChange={e => setEmail(e.target.value)}
              required
            >
              <option value="">Email</option>
              {userList.map(element => {
                return (
                  <option value={element.email}>
                    {element.email}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-group">
            <select
              className="form-select h-100 w-100"
              id="floatingInput"
              size="1"
              onChange={e => setPosition(e.target.value)}
              required
            >
              <option value="" >Position</option>
              {positionList.map(element => {
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
