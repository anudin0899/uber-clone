
import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const GoogleMapSection = () => {

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.4
  };

  const [center, setCenter] = useState({
    lat: 28.70,
    lng: 77.10
  });

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  // })



  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setdirectionRoutePoints] = useState([]);

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  //Set the Source in Map
  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo(
        {
          lat: source.lat,
          lng: source.lng
        }
      )
      setCenter({
        lat: source.lat,
        lng: source.lng
      })
    }

    if (source.length != [] && destination.length != []) {
      directionRoute();
    }

  }, [source]);

  //Set the destination in Map
  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      })
    }

    if (source.length != [] && destination.length != []) {
      directionRoute();
    }

  }, [destination]);

  // Get the direction Path route in Map
  const directionRoute = () => {
    const DirectionService = new google.maps.DirectionsService();

    DirectionService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setdirectionRoutePoints(result);
      } else {
        console.error(); ('Error');
      }
    })
  }

  console.log(center, "center");

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "c5da0a167c8c2ff5" }}
    >
      {source.length != [] ?
        <MarkerF
          position={{ lat: source.lat, lag: source.lag }}
        // icon={{
        //   url: "source.png",
        //   scaledSize: {
        //     width: 20,
        //     height: 20
        //   }
        // }}
        >
          <OverlayView
            position={{ lat: source.lat, lag: source.lag }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[18px]'>{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
        : null
      }

      {destination.length != [] ?
        <MarkerF
          position={{ lat: destination.lat, lag: destination.lag }}
        // icon={{
        //   url: "source.png",
        //   scaledSize: {
        //     width: 20,
        //     height: 20
        //   }
        // }}
        >
          <OverlayView
            position={{ lat: destination.lat, lag: destination.lag }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[18px]'>{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
        : null
      }

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: "#0075F2",
            strokeWeight: 5
          },
          suppressMarkers: true
        }}
      />

    </GoogleMap>
  )
}

export default GoogleMapSection