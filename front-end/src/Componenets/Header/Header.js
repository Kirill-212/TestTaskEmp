import React from "react";
import { Link } from "react-router-dom";
import download from "../../GenerateClientJs/Download";
export default function Header(props) {
  function LogOut() {
    localStorage.clear();
    props.setUser(undefined);
  }
  function DownloadReport() {
    download(props);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="auth" className="text-reset navbar-brand">
          <i className="fa-solid fa-right-to-bracket" />
        </Link>
        <i className="fa-solid fa-right-from-bracket m-1" onClick={LogOut} />
        <i className="fa-solid fa-link m-1" onClick={DownloadReport} />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Role
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="role/post" className="dropdown-item">
                    Post
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="role/list" className="dropdown-item">
                    List
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="user/list" className="dropdown-item">
                    List
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Position
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="position/post" className="dropdown-item">
                    Post
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="position/list" className="dropdown-item">
                    List
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Employee
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="employee/post" className="dropdown-item">
                    Post
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="employee/list" className="dropdown-item">
                    List
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item d-flex">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                {props.user !== undefined && JSON.parse(props.user).username}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
