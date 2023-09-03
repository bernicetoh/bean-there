import { ReactNode, useContext, useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import styles from "./TopNavigation.module.scss";
import logo from "../../assets/bean-outline.svg";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { UserDetails } from "../../models/user.model";
import { logout } from "../../services/authentication";

export default function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const [user, SetUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUserFromLocal = () => {
      const userStringify = localStorage.getItem("user");
      if (!userStringify) {
        return;
      } else {
        const user = JSON.parse(userStringify);
        console.log(user);
        return user;
      }
    };
    SetUser(getUserFromLocal());
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    Cookies.remove("token");
    navigate("/auth");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={styles["top-bar"]}>
        <Link className={styles.logoImg} to={"/home"}>
          <img src={logo} alt="logo" />
        </Link>
        <nav className="nav">
          <ul>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/reviews">Reviews</CustomLink>
            <CustomLink to="/locate">Locate</CustomLink>
          </ul>
        </nav>
        {Cookies.get("token") && user && (
          <div className={styles["auth-container"]}>
            <button className={styles["profile"]}>
              <Link to={"/me"} className={styles["profile-link"]}>
                {user.username}
              </Link>
            </button>
            <button onClick={() => handleLogout()} className={styles["logout"]}>
              <div>Log out</div>
            </button>
          </div>
        )}
        {!Cookies.get("token") && (
          <div className={styles["auth-container"]}>
            <Link
              to={"auth"}
              className={styles.login}
              state={{ isRegister: false }}
            >
              <div>Log in</div>
            </Link>
            <Link
              to={"auth"}
              className={styles.signup}
              state={{ isRegister: true }}
            >
              <div>Sign up</div>
            </Link>
          </div>
        )}
      </div>

      <div style={{ height: "87%" }}>
        <Outlet />
      </div>
    </div>
  );
}

interface CustomLinkProps {
  to: string;
  children: ReactNode;
}
function CustomLink({ to, children }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? styles["active"] : styles["inactive"]}>
      {isActive && (
        <motion.div
          layoutId="underline"
          style={{
            borderBottom: "1.5px solid #704638",
            display: "flex",
            width: "50%",
            alignSelf: "center",
            position: "absolute",
            inset: 0,
            margin: "0 auto",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      )}
      <Link className={styles["link"]} to={to}>
        {children}
      </Link>
    </li>
  );
}
