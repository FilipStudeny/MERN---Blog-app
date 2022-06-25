import React from 'react'
import { useParams } from 'react-router-dom';
import PlacesList from '../components/PlacesList';

const Places = () => {

    const src = 'https://i0.wp.com/scandification.com/wp-content/uploads/2020/02/norwegian-fjords-1-scaled.jpg?resize=1155%2C770&ssl=1';

    const PLACES = [
        {user: 'Nicole', id: 1, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 1, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 2, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 3, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 2, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 2, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 2, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', id: 2, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
    ];

  const userID = useParams().userID;
  const loadedPlaces = PLACES.filter(place => place.id.toString() === userID);
  return (
    <>
        <p>{userID}</p>
        <PlacesList places={loadedPlaces}/>
    </>
  )
}

export default Places