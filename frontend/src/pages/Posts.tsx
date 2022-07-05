import React from 'react'
import { useParams } from 'react-router-dom';
import PlacesList from '../components/Posts_List';

const Places = () => {

    const src = 'https://i0.wp.com/scandification.com/wp-content/uploads/2020/02/norwegian-fjords-1-scaled.jpg?resize=1155%2C770&ssl=1';

    const PLACES = [
        {user: 'Nicole', postID: 1, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 1, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 2, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 3, image: src, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 2, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 2, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 2, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
        {user: 'Nicole', postID: 2, placeName: 'Fjords - Norway', placeLocation: 'Norway - North'},
    ];

  const userID = useParams().user;
  const loadedPlaces = PLACES.filter(place => place.user.toString() === userID);
  return (
    <>
        <PlacesList places={loadedPlaces}/>
    </>
  )
}

export default Places