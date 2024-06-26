"use client"
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';
import React, { useContext, useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';




const InputItem = ({ icon, type }) => {

    const [value, setValue] = useState(null);
    const [placeholder, setPlaceholder] = useState(null);

    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);

    useEffect(() => {
        type == 'Source' ? setPlaceholder('Pickup Location') :
            setPlaceholder('Dropoff Location')
    }, [])

    // Get Latitude and Longitude
    const getLatAndLng = (place, type) => {

        const placeId = place?.value.place_id;
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId }, (place, status) => {
            if (status === 'OK' && place.geometry && place.geometry.location) {
                if (type == 'Source') {
                    setSource({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.formatted_address,
                        label: place.name
                    })
                } else {
                    setDestination({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.formatted_address,
                        label: place.name
                    })
                }
            }
        })
    }

    return (
        <div className='flex items-center gap-4 mt-3 bg-slate-200 p-3 rounded-lg'>
            <span>{icon}</span>
         
            <GooglePlacesAutocomplete
                
                selectProps={{
                    value,
                    onChange: (place) => {
                        getLatAndLng(place, type);
                        setValue(place)
                    },
                    placeholder: placeholder,
                    isClearable: true,
                    className: 'w-full',
                    components: {
                        DropdownIndicator: false
                    },
                    styles: {
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#00ffff00',
                            border: 'none',
                            outline: 'none'
                        }),
                        input: (provided) => ({
                            ...provided,
                            border: 'none'
                        })
                    },
                }}
            />
        </div>
    )
}

export default InputItem