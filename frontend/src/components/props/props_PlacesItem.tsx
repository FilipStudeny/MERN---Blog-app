export interface PlacesProps{
    places: Place[]
}

export interface Place{
    user: string,
    id: number,
    image: string,
    placeName: string,
    placeLocation: string,
}

