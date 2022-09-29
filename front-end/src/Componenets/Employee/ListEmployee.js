import React, { useEffect } from "react";
import { EmployeeApi, GetEmployeeDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Link } from "react-router-dom";

function getDate(inputDate) {
  let date = new Date(inputDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return year + "-" + month + "-" + day;
}

export default function EmployeeList(props) {
  const [listEmployee, setListEmployee] = React.useState([]);

  async function GetEmployeeList() {
    new EmployeeApi().apiEmployeeGet(
      {},
      CallbackRequest,
      Callaback,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function Callaback(data) {
    setListEmployee(
      data.map(e => {
        return GetEmployeeDto.constructFromObject(e);
      })
    );
  }

  async function RemoveEmployee(e) {
    new EmployeeApi().apiEmployeeDelete(
      { email: e.currentTarget.value },
      CallbackRequest,
      GetEmployeeList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  useEffect(() => {
    GetEmployeeList();
  }, []);

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Position Name</th>
                <th scope="col">Role Name</th>
                <th scope="col">Start Work Date</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {listEmployee.map(e => {
                return (
                  <tr>
                    <td scope="row">
                      {e.email}
                    </td>
                    <td scope="row">
                      {e.address}
                    </td>
                    <td scope="row">
                      {e.positionName}
                    </td>
                    <td scope="row">
                      {e.roleName}
                    </td>
                    <td scope="row">
                      {getDate(e.startWorkDate)}
                    </td>
                    <td>
                      <button
                        color="purple"
                        size="sm"
                        className="btn text-white btn-primary-sm btn-sm m-2"
                        value={e.email}
                        onClick={RemoveEmployee}
                      >
                        <i className="fa-regular fa-trash-can" />
                      </button>
                      <Link
                        size="sm"
                        className="text-reset btn btn-primary-sm btn-sm m-2"
                        to={`/Employee/put?email=${e.email}
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
