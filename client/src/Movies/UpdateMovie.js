import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        </FormGroup>
       
      <FormGroup>
        <Label for="director">Director</Label>
      <Input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
      </FormGroup>
      
      <FormGroup>
        <Label for="metascore">Metascore</Label>
        <Input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
      </FormGroup>

      <FormGroup>
      <Label for="stars">Stars</Label>
      <Input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
         />
      </FormGroup>

      <Button color="secondary" >Update Now</Button>
      
      </Form>
    </div>
  );
};

export default UpdateMovie;