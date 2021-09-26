import React, { useState } from "react";
import axios from "axios";

function Header() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    async function login() {
        try {
            const res = await axios.get("/auth/google/token");
            setUser(res.data);
            usetLoggedIn(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <header>
            <h1><a href="/">Note Lite</a></h1>
            {/* <div className="btn-login" onClick={login}>
                <img src={isLoggedIn ? null : "/images/google-color.png"} alt="google profile" />
                <span>{isLoggedIn ? "Logout" : "Login"}</span>
            </div> */}
        </header>
    );
}

export default Header;