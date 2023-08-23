import { ReactNode, useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./TopNavigation.module.scss";
import logo from "../../assets/bean-outline.svg";

import { motion } from "framer-motion";
import AuthContext from "../../context/AuthProvider";
interface Props {
  children: ReactNode;
}
export default function TopNavigation({ children }: Props) {
  const { authState } = useContext(AuthContext);
  const { loggedIn, userInfo } = authState;
  return (
    <div>
      <div className={styles["top-bar"]}>
        <Link className={styles.logoImg} to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <nav className="nav">
          <ul>
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/reviews">Reviews</CustomLink>
            <CustomLink to="/locate">Locate</CustomLink>
          </ul>
        </nav>
        {loggedIn && (
          <div className={styles["profile"]}>
            <button>
              <p>{userInfo.username}</p>
            </button>
          </div>
        )}
        {!loggedIn && (
          <div className={styles["auth-container"]}>
            <Link to={"login"} className={styles.login} target="_blank">
              <div>Log in</div>
            </Link>
            <Link to={"signup"} className={styles.signup} target="_blank">
              <div>Sign up</div>
            </Link>
          </div>
        )}
      </div>

      {children}
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
            // justifyContent: "center",
            display: "flex",
            width: "50%",
            alignSelf: "center",
            // alignItems: "center",
            // backgroundColor: "#977c5a",
            position: "absolute",
            inset: 0,
            margin: "0 auto",
            // borderRadius: 20,
          }}
        />
      )}
      <Link className={styles["link"]} to={to}>
        {children}
      </Link>
    </li>
  );
}
