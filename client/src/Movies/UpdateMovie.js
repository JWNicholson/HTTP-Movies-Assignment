import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = props => {
  
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const MovieToUpdate = props.movies.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });

    console.log("movieToUpdate: ", MovieToUpdate);

    if (MovieToUpdate) {
       setMovie(MovieToUpdate);
    }
  }, [props.movies, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();

    let value = ev.target.value;
    
    if (ev.target.name === "stars") {
      // Convert comma seprated string to array.
      value = value.split(",");
    }
    
    setMovie({
      ...movie,
      [ev.target.name]:  value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(movie);
    // PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        const finalMovies = props.movies.map(mov => mov.id === movie.id ? { ...mov,  ...movie} : mov);
        //console.log(finalMovies);
      
        props.updateMovies(finalMovies);
        props.history.push(`/movies/${props.match.params.id}`)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="update-movie">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
      
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
      
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
     
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
       
        <button className="update-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;