import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import AddPost from '../pages/Addpost';
import scribeslogo from '../assets/images/scribeslogo.jpg';

const Navbar = () => {
    const { logOutUser } = useContext(AuthContext);
    const [isAddPostOpen, setIsAddPostOpen] = useState(false);

    const getToken = () => {
        return localStorage.getItem("authToken");
    };

    return (
        <>
            
            <nav className='navbar1'>
                {!getToken() ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                     <div className="topoffeed">
                <img className="toplogo" src={scribeslogo} alt="Scribes Logo" />
                <h1 className="feedlogop">Scribes</h1>
            </div>
                        <Link to="/feed">🏠</Link>
                        <Link to="/profile">👤</Link>
                        <button onClick={() => setIsAddPostOpen(true)}>Add Story 📚</button>
                        {isAddPostOpen && <AddPost onClose={() => setIsAddPostOpen(false)} />}
                        <button className="logoutb" onClick={logOutUser}>Logout</button>
                        <p className="navbarscribes">Scribes 2024</p>
                    </>
                )}
            </nav>
        </>
    );
};

export default Navbar;
