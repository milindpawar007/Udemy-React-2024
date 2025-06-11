import { useNavigate } from "react-router-dom";
import Button from "../Component/Button";
import PageNav from "../Component/PageNav";
import { useAuthContext } from "../Context/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthContext()
  function handelSubmit(e) {
    e.preventDefault();

    if (email && password) {

      login(email, password)
    }
  }

  useEffect(() => {

    if (isAuthenticated) {
      navigate('/app')
    }

  }, [isAuthenticated])
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handelSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>

        </div>
      </form>
    </main>
  );
}
