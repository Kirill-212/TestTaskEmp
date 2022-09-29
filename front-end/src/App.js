import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import Context from "./Context";
import Header from "../src/Componenets/Header/Header";
import Footer from "../src/Componenets/Footer/Footer";
import PostUser from "../src/Componenets/User/PostUser";
import PutUser from "../src/Componenets/User/PutUser";
import AuthUser from "../src/Componenets/Auth/Auth";
import UserList from "../src/Componenets/User/UserList";
import PostRole from "../src/Componenets/Role/PostRole";
import RoleList from "../src/Componenets/Role/RoleList";
import RolePut from "../src/Componenets/Role/PutRole";
import PostPosition from "../src/Componenets/Position/PostPosition";
import PutPosition from "../src/Componenets/Position/PutPosition";
import ListPosition from "../src/Componenets/Position/PositionList";
import PostEmployee from "../src/Componenets/Employee/PostEmployee";
import PutEmployee from "../src/Componenets/Employee/PutEmployee";
import ListEmployee from "../src/Componenets/Employee/ListEmployee";
function App() {
  const [user, setUser] = React.useState(undefined);
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
  const [errorMess, setErrorMess] = React.useState("");
  if (user === undefined)
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMess("");
    setOpenErrorAlert(false);
  };

  return (
    <Context.Provider value={{ user, setUser }}>
      <Router>
        <Header
          user={user}
          setErrorMess={setErrorMess}
          setOpenErrorAlert={setOpenErrorAlert}
          setUser={setUser}
        />
        <Routes>
          <Route
            path="register"
            element={
              <PostUser
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="role/post"
            element={
              <PostRole
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="role/list"
            element={
              <RoleList
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="role/put"
            element={
              <RolePut
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="user/list"
            element={
              <UserList
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="user/put"
            element={
              <PutUser
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="position/post"
            element={
              <PostPosition
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="position/list"
            element={
              <ListPosition
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="position/put"
            element={
              <PutPosition
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="employee/post"
            element={
              <PostEmployee
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="employee/put"
            element={
              <PutEmployee
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="employee/list"
            element={
              <ListEmployee
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
          <Route
            path="auth"
            element={
              <AuthUser
                setUser={setUser}
                setErrorMess={setErrorMess}
                setOpenErrorAlert={setOpenErrorAlert}
              />
            }
          />
        </Routes>
        <Footer
          open={openErrorAlert}
          errorMess={errorMess}
          handleClose={handleClose}
        />
      </Router>
    </Context.Provider>
  );
}

export default App;
