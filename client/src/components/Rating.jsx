import React, { useState } from 'react';

function Rating() {
    const [rating,setRating]=useState(null)
    const handleRating = (currentRating) => {
      const rating = ["\u2605", "\u2605", "\u2605", "\u2605", "\u2605", '\u2606', '\u2606', '\u2606', '\u2606', '\u2606'];
      const myRating = [...rating.slice(0, currentRating), ...rating.slice(5, 10 - currentRating)];
      setRating(myRating.join(''));
    }

  return ( 
      <>
    {
      !rating?
      <>
      <span style={{cursor:'pointer'}} onClick={()=>handleRating(1)}>&#9734;</span>
      <span style={{cursor:'pointer'}} onClick={()=>handleRating(2)}>&#9734;</span>
      <span style={{cursor:'pointer'}} onClick={()=>handleRating(3)}>&#9734;</span>
      <span style={{cursor:'pointer'}} onClick={()=>handleRating(4)}>&#9734;</span>
      <span style={{cursor:'pointer'}} onClick={()=>handleRating(5)}>&#9734;</span>
    
      </>:
      rating
    }

</>
  )
}

export default Rating