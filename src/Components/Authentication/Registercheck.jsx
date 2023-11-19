import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../config.js";
import styles from "./Verify.module.css";

const Registercheck = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const verifyUser = async () => {
    const Response = await fetch(`${backendUrl}/auth/validate`, {
      method: "PUT",
      body: JSON.stringify({
        resetKey: params.get("reset"),
        isVerified: "true",
        code: "1",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await Response.json();
    // console.log(data === true);
    if (data === true) {
      alert("Account Activated ");
      navigate("/login");
    } else {
      alert("Activation failed");
    }
  };
  useEffect(() => {
    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.box}>
      <h1 className={styles.h1}>VERIFYING THE EMAIL</h1>
      <div className={styles.center}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
    </div>
  );
};

export default Registercheck;
