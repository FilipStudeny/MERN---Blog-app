import PlaceItem from './PlaceItem';
import { PlacesProps } from './props/props_PlacesItem'

import '../styles/placesList.css'


const PlacesList = ({ places } : PlacesProps) => {


    if(!places?.length){
        return(
            <div>
                <h3>No places Found !</h3>
            </div>
        );
    }

    return(
        <div className='placesList'>
            <h1>Places</h1>
            {places.map(({user, id, image , placeName, placeLocation}) => (
                <PlaceItem 
                    user={user} 
                    id={id} 
                    image={image} 
                    placeName={placeName} 
                    placeLocation={placeLocation}/> 
            ))}
        </div>
    );
}

export default PlacesList