import { Link, useLocation } from "react-router-dom";
function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link to="details"
        className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>Details</Link>
      <Link to="questions"
        className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}>Questions</Link>
    </nav>

);}

export default Nav;
