import React, { useEffect } from "react";

import { UserApi, GetUserDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Link } from "react-router-dom";

export default function UserList(props) {
  const [listUser, setListUser] = React.useState([]);

  async function GetUserList() {
    new UserApi().apiUserGet(
      {},
      CallbackRequest,
      Callaback,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function Callaback(data) {
    setListUser(
      data.map(e => {
        return GetUserDto.constructFromObject(e);
      })
    );
  }

  async function RemoveUser(e) {
    new UserApi().apiUserDelete(
      { email: e.currentTarget.value },
      CallbackRequest,
      GetUserList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  useEffect(() => {
    GetUserList();
  }, []);

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Role name</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map(e => {
                return (
                  <tr>
                    <td scope="row">
                      {e.email}
                    </td>
                    <td scope="row">
                      {e.roleName}
                    </td>
                    <td>
                      <button
                        color="purple"
                        size="sm"
                        className="btn text-white btn-primary-sm btn-sm m-2"
                        value={e.email}
                        onClick={RemoveUser}
                      >
                        <i className="fa-regular fa-trash-can" />
                      </button>
                      <Link
                        size="sm"
                        className="text-reset btn btn-primary-sm btn-sm m-2"
                        to={`/user/put?email=${e.email}&roleName=${e.roleName}
                          `}
                      >
                        <i className="fa-solid fa-screwdriver-wrench" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
