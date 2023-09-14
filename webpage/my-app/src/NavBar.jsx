import React from "react";
import { Link } from "react-router-dom"; 
function Navbar() {
    return (
        <nav>
            <ul>
                <div className="NavLinks">
                    <Link to="/">Home| </Link>
                    <Link to="/about">|About|</Link>
                    <Link to="/newGame">|New Game|</Link>
                    <Link to="/login">|Login</Link>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
