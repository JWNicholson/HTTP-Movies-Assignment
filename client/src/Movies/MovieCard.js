import React from 'react';
import { Card,  CardTitle, CardText } from 'reactstrap';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
      <CardTitle><h2>{title}</h2></CardTitle>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </Card>
  );
};

export default MovieCard;
