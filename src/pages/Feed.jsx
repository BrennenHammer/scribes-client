import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import axios from "axios";
import scribeslogo from '../assets/images/scribeslogo.jpg';
import { AuthContext } from "../context/authContext";

function SkillsFeed() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    get("/feed") // Change to /books or the appropriate endpoint for fetching books
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      });
  }, []);

  let checkFormat = (image) => {
    let array = image.split(".");
    return array[array.length - 1] === "mp4";
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`/delete/${bookId}`);
      // Remove the book from the UI
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleLike = async (bookId) => {
    try {
      const response = await axios.post(`/books/${bookId}/like`);
      const updatedLikes = response.data.likes;

      const updatedBooks = books.map((book) =>
        book._id === bookId ? { ...book, likes: updatedLikes } : book
      );

      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error liking the book:", error);
    }
  };

  const isOwner = (book, userId) => {
    return book.author && book.author._id === userId;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="topoffeed">
        <img className="toplogo" src={scribeslogo} alt="Scribes Logo" />
        <h1 className="feedlogop">Scribes</h1>
      </div>
      <div className="feed-container">
        <div className="skills-feed">
          {books.map((book) => (
            <div key={book._id} className="post">
              {user && isOwner(book, user._id) && (
                <button
                  className="delete-post-btn"
                  onClick={() => deleteBook(book._id)}
                >
                  X
                </button>
              )}
              <div className="post-header">
                {book.author && (
                  <Link to={`/user-profile/${book.author._id}`}>
                    <img
                      className="feedprofilep"
                      src={book.author.profilePicture}
                      alt={`${book.author.username}'s profile`}
                      width="50"
                      height="50"
                    />
                    <h3 className="feedpagename">{book.author.username}</h3>
                  </Link>
                )}
              </div>
              {checkFormat(book.mediaUrl) ? (
                <video className="videofeed" src={book.mediaUrl} controls />
              ) : (
                <img className="bookfeed" src={book.mediaUrl} alt={book.caption} />
              )}
              <p className="postcaption">{book.caption}</p>
              <button
                className="likebutton"
                onClick={() => handleLike(book._id)}
              >
                ♥
                {book.likes.length}
              </button>
            </div>
          ))}
        </div>
        <div className="app-name-container">
          <img src={scribeslogo} alt=" Logo" />
          <h1 className="feedpara">Scribes</h1>
        </div>
        <footer>
          <p>&copy; 2024 Scribes</p>
        </footer>
      </div>
    </div>
  );
}

export default SkillsFeed;
