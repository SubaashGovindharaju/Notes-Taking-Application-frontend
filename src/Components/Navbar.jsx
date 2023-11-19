import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTask from "./CreateTask";
import EditTask from "./Editpage";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register";
import ForgotPasswordUI from "./Authentication/Forgotpassword";
import Reset from "./Authentication/PasswordReast";
import Verify from "./Authentication/Verify";
import Registercheck from "./Authentication/Registercheck";
import PrivateRoute from "./PrivateRoute";
import { useState, useEffect } from "react";

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user data is present in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const handleButtonClick = () => {
    if (loggedIn) {
      // If user is logged in, perform logout action
      localStorage.removeItem("user");
      setLoggedIn(false); // Update the state to reflect the logout
      window.location.reload(); // Reload the page after logout
    } else {
      window.location.href = "/login"; // Replace with your login page URL
    }
  };
  // const handleclick = () => {
  //   localStorage.removeItem("user");
  //   <Navigate to={"/login"} />;
  //   window.location.reload();
  // };
  return (
    <div  >
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Brand style={{ fontSize: 30 }} href="/">
            Notes
          </Navbar.Brand>

          <Navbar.Collapse id="navbarScroll">
         
          </Navbar.Collapse>
          <div>
            <Button variant="outline-danger" onClick={handleButtonClick}>
              {loggedIn ? "Logout" : "Login"}
            </Button>
          </div>
        </Container>
      </Navbar>
      {/* <Home/> */}

      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<PrivateRoute element={<Home />} />} />
          <Route index element={<PrivateRoute element={<Home />} />} />
          <Route
            path="CreateTask"
            element={<PrivateRoute element={<CreateTask />} />}
          />
          <Route
            path="/edit/:id"
            element={<PrivateRoute element={<EditTask />} />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ForgotPasswordUI />} />
          <Route path="/paswordreset" element={<Reset />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/twostep" element={<Registercheck />} />
          <Route
            path="/CreateTask"
            element={<PrivateRoute element={<CreateTask />} />}
          />
          <Route path="task">
            {/* <Route path="Liststudent" element={<Liststudent />} /> */}
            {/* <Route path="Profile" element={<Profile />} /> */}
            {/* <Route path="Edituser" element={< Editstudent />} /> */}
            {/* <Route path=":studentId" element={< Studentid />} /> */}
          </Route>
          <Route
            path="/404"
            element={<h3>Page not found ,please check url</h3>}
          />
          {/* <Route path='*' element={<Navigator to={'/404'} replace />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Nav;
