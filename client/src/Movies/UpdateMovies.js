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

    
    
}
export default UpdateMovie;