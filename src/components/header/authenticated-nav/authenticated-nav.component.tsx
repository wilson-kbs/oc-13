import styles from "./authenticated-nav.module.scss";
import { useGetProfileQuery } from "src/app/services/profile.ts";
import { Link } from "react-router-dom";

function AuthenticatedUserNav() {
  const { data } = useGetProfileQuery();

  return (
    <div className={styles.Container}>
      <Link to="/profile">
        <i className="fa fa-user-circle"></i>
        {data?.firstName}
      </Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default AuthenticatedUserNav;
