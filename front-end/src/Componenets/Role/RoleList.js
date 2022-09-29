import React, { useEffect } from "react";
import { RoleApi, GetRoleDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Link } from "react-router-dom";

export default function PostRole(props) {
  const [listRole, setListRole] = React.useState([]);

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
    setListRole(
      data.map(e => {
        return GetRoleDto.constructFromObject(e);
      })
    );
  }

  async function RemoveRole(e) {
    new RoleApi().apiRoleDelete(
      { name: e.currentTarget.value },
      CallbackRequest,
      GetRoleList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  useEffect(() => {
    GetRoleList();
  }, []);

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Role name</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {listRole.map(e => {
                return (
                  <tr>
                    <td scope="row">
                      {e.roleName}
                    </td>
                    <td>
                      <button
                        color="purple"
                        size="sm"
                        className="btn text-white btn-primary-sm btn-sm m-2"
                        value={e.roleName}
                        onClick={RemoveRole}
                      >
                        <i className="fa-regular fa-trash-can" />
                      </button>
                      <Link
                        size="sm"
                        className="text-reset btn btn-primary-sm btn-sm m-2"
                        to={`/role/put?roleName=${e.roleName}
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
