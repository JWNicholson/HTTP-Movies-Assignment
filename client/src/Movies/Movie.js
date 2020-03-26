import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Button, Card } from 'reactstrap';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const delMovie = (e) => {
   
      e.preventDefault();
  
      axios
        .delete(`http://localhost:5000/api/movies/${movie.id}`)
        .then(res => {
          console.log(res);
          props.updateMovies(props.movies.filter(movie => movie.id !== res.data));
          props.history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <>
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      </div>

      <Card body inverse style={{ backgroundColor: '#efefef', borderColor: '#333' }}>
      <Button color="primary" size="lg" block onClick={saveMovie}>
        Save
      </Button>
      <Button color="secondary" size="lg"  block onClick={() => props.history.push(`/update-movie/${movie.id}`)}>
        Update
      </Button>
      <Button color="danger" size="lg"  block  onClick={delMovie}>
        Delete
      </Button >
      </Card>

    </>
  );
}

export default Movie;