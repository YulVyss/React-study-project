import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="header bg-light">
            <div className="container">
                <nav className="navbar ">
                    <ul className="nav">
                        <li className="nav-item"><NavLink exact className="nav-link" to="/">Home</NavLink></li>
                        <li className="nav-item"><NavLink exact className="nav-link" to="/note">Note</NavLink></li>
                        <li className="nav-item"><NavLink exact className="nav-link" to="/create">Create</NavLink></li>
                        <li className="nav-item"><NavLink exact className="nav-link" to="/about">About</NavLink></li>
                    </ul>
                </nav>
            </div>

        </header>
    );
}

export default Header;