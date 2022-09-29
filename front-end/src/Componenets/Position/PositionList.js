import React, { useEffect } from "react";
import { PositionApi, GetPositionDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Link } from "react-router-dom";

export default function PositionList(props) {
  const [listPosition, setListPosition] = React.useState([]);

  async function GetPositionList() {
    new PositionApi().apiPositionGet(
      {},
      CallbackRequest,
      Callaback,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function Callaback(data) {
    setListPosition(
      data.map(e => {
        return GetPositionDto.constructFromObject(e);
      })
    );
  }

  async function RemovePosition(e) {
    new PositionApi().apiPositionDelete(
      { name: e.currentTarget.value },
      CallbackRequest,
      GetPositionList,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  useEffect(() => {
    GetPositionList();
  }, []);

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {listPosition.map(e => {
                return (
                  <tr>
                    <td scope="row">
                      {e.name}
                    </td>
                    <td scope="row">
                      {e.description}
                    </td>
                    <td>
                      <button
                        color="purple"
                        size="sm"
                        className="btn text-white btn-primary-sm btn-sm m-2"
                        value={e.name}
                        onClick={RemovePosition}
                      >
                        <i className="fa-regular fa-trash-can" />
                      </button>
                      <Link
                        size="sm"
                        className="text-reset btn btn-primary-sm btn-sm m-2"
                        to={`/position/put?name=${e.name}
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
