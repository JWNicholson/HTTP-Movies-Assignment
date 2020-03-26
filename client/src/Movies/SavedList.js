import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <Button color="primary"><Link to="/">Home</Link></Button>
      </div>
      <div className="add-a-movie-btn">
       <Button color="success"><Link to="/add-movie">Add A Movie</Link></Button> 
      </div>
    </div>
  );
}

export default SavedList;
