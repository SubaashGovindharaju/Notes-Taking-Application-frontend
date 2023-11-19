import { useNavigate } from "react-router-dom";
import styles from './Forgotpassword.module.css';

import { useState } from "react";
import { backendUrl } from "../config.js";

function ForgotPasswordUI() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();

  const handleReset = () => {
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await fetch(`${backendUrl}/auth/password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // eslint-disable-next-line no-unused-vars
    const data = await loginResponse.json();
    if (loginResponse.status === 404) {
      alert("user not found");
    } else {
      alert("check your mail");
      // console.log(data.responceObj.email);
      handleReset();
      navigate("/login");
    }
  };

  return (
    <div className={styles.passwordbody}>
      <div className={styles.card}>
        <p className={styles.lockicon}>
          <i className={`fas fa-lock`}></i>
        </p>
        <h2 className={styles.h2}>Forgot Password?</h2>
        <p>You can reset your Password here</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.passInput}
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Email address"
          />
          <button className={styles.button}>Send My Password</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordUI;
