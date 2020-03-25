import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useParams, useHistory } from "react-router-dom";

function Movie({ addToSavedList }) {
  
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
 
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div
        className="update-button"
        onClick={() => history.push(`/update-movie/${id}`)}
      >
        Update
      </div>
    

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="delete-button" >
          Delete
        </div>
    </div>
  );
}

export default Movie;