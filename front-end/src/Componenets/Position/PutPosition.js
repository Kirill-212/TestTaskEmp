import React, { useEffect } from "react";
import { PositionApi, PutPositionDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PutPosition(props) {
  const [name, setName] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  async function Put(e) {
    e.preventDefault();
    new PositionApi().apiPositionPut(
      {
        body: new PutPositionDto(name, description, newName)
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

  async function GetPosition(name) {
    new PositionApi().apiPositionByNameGet(
      {
        name: name
      },
      CallbackRequest,
      CallabackGet,
      props.setErrorMess,
      props.setOpenErrorAlert
    );
  }

  function CallabackGet(data) {
    setDescription(data.description);
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setName(query.get("name"));
    setNewName(query.get("name"));
    GetPosition(query.get("name"));
  }, []);

  return (
    <div className="container  bg-secondary position-absolute top-50 start-50 translate-middle w-25 shadow-lg p-3 mb-5 rounded ">
      {redirect && <Navigate to={"/"} />}
      <form onSubmit={Put}>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
              required
              value={newName}
              onChange={e => {
                setNewName(e.target.value);
              }}
            />
            <label for="floatingInput">Name</label>
          </div>
        </div>
        <div className="row  mb-1 justify-content-center pt-1">
          <div className="col form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              required
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
            <label for="floatingTextarea">Description</label>
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
