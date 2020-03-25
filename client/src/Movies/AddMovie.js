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
    }

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
        
    );

}
export default AddMovie;