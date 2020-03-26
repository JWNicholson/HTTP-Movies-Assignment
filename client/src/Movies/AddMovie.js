import React, { useState,  } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

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

        <Button color="info" className="addMovie-the-btn">Add the movie</Button>
      </Form>
    </div>
  );
};

export default AddMovie;