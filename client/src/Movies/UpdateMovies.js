import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';

const UpdateMovies = props => {
    const initialState = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [movie, setMovie] = useState(initialState)
    const {id} = {useParams}
    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);

        if(movieToUpdate){
            console.log('movieToUpdate', movieToUpdate);
            setMovie({...movieToUpdate, stars: movieToUpdate.stars.join(', ')});
        }
    }, [props.movieList, id]);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        movie.stars = movie.stars.split(', ');

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovie(initialState); // Clear form after submit
                props.history.push('/');
            })
            .catch(err => console.log(err))
    };
    
    return (
        <div className="update-form">
        <h3 className="update-title">Update Movie</h3>
      <form onSubmit={handleSubmit} className="form">
       
          
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


export default UpdateMovies;