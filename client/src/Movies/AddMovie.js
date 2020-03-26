import React, { useState,  } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = props => {
  
  const [movie, setMovie] = useState(initialMovie);

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
      .post(`http://localhost:5000/api/movies`, movie)
      .then(res => {
        //console.log(res);
       props.updateMovies(res.data);
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="update-movie">
      <h2>Add Movie</h2>
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


        <button className="addMovie-the-btn">Add the movie</button>
      </form>
    </div>
  );
};

export default AddMovie;