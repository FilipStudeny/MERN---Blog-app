import React from 'react'
import { Link } from 'react-router-dom'
import { Place } from './props/props_PlacesItem'

const PlaceItem = ( { user, id, image, placeName, placeLocation } : Place ) => {
  return (
    <div className='placesList_Item'>
        <div className='placesList_Header'>
          <h2>{ placeName }</h2>
          <Link to={`/${id}/place/${placeName}`}>Edit</Link>
        </div>
        <img className='placesList_Image' src={image} alt={placeName}/>
        <div className='placesList_Data'>
          <p>Location: { placeLocation }</p>
          <Link to={`/${id}/place/${placeName}`}>View details</Link>
        </div>        
    </div>
  )
}

export default PlaceItem