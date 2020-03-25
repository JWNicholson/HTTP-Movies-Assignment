import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    id: Date.now(),
    title:'',
    director:'',
    metascore: '',
    stars: []
}

const AddMovie = props => {
    const [movie, setMovie] = useState(initialState);
    const [starInput, setStarInput] = useState("");

    const {id} = props.match.params;

    useEffect(() => {
        if (id)
            axios
                .get(`http://localhost:5000/api/movies/${id}`)
                    .then(res => setMovie(res.data))
                    .catch(err => console.log("AddMovie axios.get error: ", err));
    },[]);

    const addStar = name => {
        if(name){
            setMovie({...movie, stars: [...movie.stars, name]});
            setStarInput("");
        }else{
            alert("You have to enter at least one star, homey");
        }
    };

    const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if(!id){
            axios
                .post("http://localhost:5000/api/movies", movie)
                .then(res => {
                    setMovie(initialState);//clears the form after submitted
                    props.history.push("/");
                })
                .catch(err => console.log("handleSubmit error: ", err));
        }
    };

    return (
        <div className="addMovie-form">
            <h3 className="addMovie-title">Add A Movie</h3>

            <form onSubmit={handleSubmit}>

                <label htmlFor="title">Title:
                <input
                    id="title"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                />
                </label>

                <label htmlFor="title">Director:
                <input
                    id="metascore"
                    name="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                />
                </label>

                <label htmlFor="title">director:
                <input
                    id="director"
                    name="director"
                    value={movie.director}
                    onChange={handleChange}
                />
                </label>

                <label htmlFor="stars">Stars
                <input 
                    className="addMovie-actors-input" 
                    type="textfield" 
                    name="actors" 
                    placeholder='actors here, separated by commas' 
                    value={movie.stars} 
                    onChange={handleChange} 
                />
                </label>
            <button className="addMovie-btn">Add Movie</button>
            </form>


        </div>
    );

}
export default AddMovie;