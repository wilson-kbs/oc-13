import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import AuthenticatedUserNav from "./authenticated-nav/authenticated-nav.component.tsx";

function Header() {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated,
  );

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="public/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {!isAuthenticated ? (
            <Link className="main-nav-item" to="/signin">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          ) : (
            <AuthenticatedUserNav />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
