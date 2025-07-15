import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api' 
import { useState, useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
}

const LiveTracking = () => {
    const [currentPositon, setCurrentPosition] = useState<typeof center>(center);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
            lat:latitude,
            lng:longitude
        })
      });

      const watchId = navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
            lat:latitude,
            lng:longitude
        })
      })
      
      return ()=> navigator.geolocation.clearWatch(watchId);

    },[])
    
    useEffect(() => {
      const updatePosition = ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude} = position.coords;
            setCurrentPosition({
                lat:latitude,
                lng:longitude
            })
        })
      }

      updatePosition();

      const intervalId = setInterval(updatePosition, 10000);
    
      return () => {
        clearInterval(intervalId)
      }
    }, [])
    

  return (
    <LoadScript  googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API} >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPositon}
            zoom={15}
        >
            <Marker position={currentPositon} />
        </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking