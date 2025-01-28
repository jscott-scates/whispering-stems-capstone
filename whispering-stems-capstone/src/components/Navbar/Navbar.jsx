import { Link, useNavigate } from "react-router-dom"


export const Navbar = () => {
    const navigate = useNavigate()

    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/">LOGO-Home</Link>
        </li>
        <li className="navbar-item">
            <Link to= "/about">About</Link>
        </li>
        <li className="navbar-item">
            <Link to="/floret-library">Floret Library</Link>
        </li>
        <li className="navbar-item">
            <Link to="/create-arrangement">Create New Arrangement</Link>
        </li>
        <li className="navbar-item">
            <Link to="/arrangements">Arrangements</Link>
        </li>
        <li className="navbar-item">
            <Link to="/Account">My Account</Link>
        </li>
        {localStorage.getItem("whisperingStems_user") ? (
        <li className="navbar-item navbar-logout">
            <Link
                className="navbar-link"
                 to=""
                 onClick={() => {
                 localStorage.removeItem("whisperingStems_user")
                 navigate("/", { replace: true })
                 }}
            >
            Logout
            </Link>
        </li>
        ) : (
            ""
        )}
    </ul>
}
