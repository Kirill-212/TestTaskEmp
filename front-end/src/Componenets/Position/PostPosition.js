import * as React from "react";
import { PositionApi, PostPositionDto } from "../../GenerateClientJs/index";
import CallbackRequest from "../../Callback/CallbackRequest";
import { Navigate } from "react-router-dom";

export default function PostPosition(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  async function Post(e) {
    e.preventDefault();
    new PositionApi().apiPositionPost(
      {
        body: new PostPositionDto(name, description)
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
              placeholder="Name"
              required
              onChange={e => {
                setName(e.target.value);
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
