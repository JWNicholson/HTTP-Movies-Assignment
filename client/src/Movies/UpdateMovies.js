import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { response } from 'express';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}


const UpdateMovie = props => {
    // const { title, director, metascore, stars } = props.movie;
    const [movie, setMovie] = useState({...initialState});

    useEffect(() => {
        const movieToUpdate =
                 props.movies
                    .filter(movie => {
                     return movie.id === props.match.params.id
                 })
                 movieToUpdate && setMovie(movieToUpdate)
            
    }, [props.match.params.id])

    const handleChange = e => {
        if(e.target.name === "stars"){
            const stars = e.target.value.split(",");
            setMovie({...movie, [e.target.name]: stars});
        } else {
            setMovie({ ...movie, [e.target.name]: e.target.value})
        }
    }

    const saveMovie = e => {
        e.preventDefault();
        console.log(movie);
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          console.log(res);
          props.setMovies(props.movies.map(i => {
            if (i.id === movie.id) {
              return res.data;
            } else {
              return i;
            }
          }))
          props.history.push("/");
        })
        .catch(err => {
            console.log("Axios PUT error: ", err.message)
        })
  
        setMovie({...initialState});
    }

    return (
        <div className="update-form">
            <h3 className="update-title">Update Movie</h3>
          <form onSubmit={saveMovie} className="form">
           
              
                <label htmlFor="title">Title</label>
                <input 
                className="update-title-input" 
                type="text" name="title" 
                placeholder='title' 
                value={movie.title} 
                onChange={handleChange}
                />
             
             
                <label htmlFor="metascore">Metascore</label>
                <input 
                className="metascore-input" 
                type="number" 
                name="metascore" 
                placeholder={100} 
                value={movie.metascore} 
                onChange={handleChange} 
                />
              
          
              <label htmlFor="director">Director</label>
              <input 
              className="update-director-input" 
              type="text" name="director" 
              placeholder='director' 
              value={movie.director} 
              onChange={handleChange} 
              />
           
              <label htmlFor="stars">Actors</label>
              <input 
              className="update-actors-input" 
              type="textfield" 
              name="actors" 
              placeholder='actors here, separated by commas' 
              value={movie.stars} 
              onChange={handleChange} 
              />
          
            <button className="update-movie-btn" type="submit">Save</button>
          </form>
        </div>
      );  
};
export default UpdateMovie;