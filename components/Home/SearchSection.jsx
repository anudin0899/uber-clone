"use client"
import React, { useContext, useState } from 'react'
import InputItem from './InputItem'
import { CircleDot, Waypoints } from 'lucide-react'
import { Button } from '../ui/button'
import { SourceContext } from '../../context/SourceContext'
import { DestinationContext } from '../../context/DestinationContext'
import CarListOptions from './CarListOptions'

const SearchSection = () => {

    const [distance, setDistance] = useState();

    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);


    const calculateDistance = () => {
        if (source?.length != [] && destination.length != []) {
            const dist = google.maps.geometry.spherical.computeDistanceBetween(
                { lat: source.lat, lng: source.lng },
                { lat: destination.lat, lng: destination.lng }
            )
            setDistance(dist * 0.000621374);
        }
    }

    return (
        <div className='h-full'>
            <div className='p-2 h-full md:p-5 border-[2px] rounded-xl'>

                <p className='text-[20px] font-bold'>Get a ride</p>
                <InputItem icon={<Waypoints />} type='Source' />
                <InputItem icon={<CircleDot />} type='Destination' />

                <Button
                    onClick={() => calculateDistance()}
                    className='mt-5 w-full'
                >
                    Search
                </Button>

                <div>
                    {distance ? <CarListOptions distance={distance} /> : null}
                </div>

            </div>
        </div>
    )
}

export default SearchSection