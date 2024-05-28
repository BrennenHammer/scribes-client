import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from '../context/authContext';
import AddPost from '../pages/Addpost';

const Navbar = () => {
    const { logOutUser } = useContext(AuthContext);
    const [isAddPostOpen, setIsAddPostOpen] = useState(false);

    const getToken = () => {
        return localStorage.getItem("authToken");
    };

    return (
        <nav className='navbar1'>
            {!getToken() && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}

            {getToken() && 
                <>
                    <Link to="/feed">🏠</Link>
                    <Link to="/profile">👤</Link>
                    <Link to="/subscribers">Subscribers</Link>
                    <button onClick={() => setIsAddPostOpen(true)}>Add Story 📚</button>
                    {isAddPostOpen && <AddPost onClose={() => setIsAddPostOpen(false)} />}
                    <button className="logoutb" onClick={logOutUser}>Logout</button>

                    <p className="navbarscribes">Scribes 2024</p>
                </>
               
            }
        </nav>
    );
};

export default Navbar;
