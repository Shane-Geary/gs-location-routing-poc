import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"

/**
 * Custom React hook that uses Geolocation API to continuously watch for the user's location.
 * @param {boolean} startGeoWatch - A boolean that indicates whether or not to start watching for location.
 * @returns {Object} An object with the IDs of the geolocation watch and interval.
 */


export const useGeoLocationWatcher = (startGeoWatch) => {

    const navigate = useNavigate()

    // State variables for the geolocation watch ID and interval ID
    const [geoWatchID, setGeoWatchID] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        // Function that runs at a regular interval to watch for the user's location.
        let counter = 0
        const geoWatchTimer = () => {
            // Watch for the user's position using the Geolocation API.
            const watchID = navigator.geolocation.watchPosition(
                // On success, set coordinates to geoWatchID state, navigate to map, clear watch and reset counter to 0
                (success) => {
                    console.log(success)
                    setGeoWatchID(success)
                    setId(watchID)
                    navigate('/')
                    navigator.geolocation.clearWatch(watchID)
                    counter = 0
                },
                // On error, set geoWatchID back to null, navigate to LocationPermissions, clear watch and reset counter to 0
                (error) => {
                    console.log(error)
                    setGeoWatchID(null)
                    navigate('/locationpermissions')
                    navigator.geolocation.clearWatch(watchID)
                    counter = 0
                }
            )
            console.log('geo watch tick: ', watchID)
            // This will keep track of the number of calls made to watch geolocation
            setId(watchID)

            counter++

            // If no response is received after 5 attempts, redirect to the location permissions page.
            if(counter >= 5) {
                console.log('error: no response from geolocation')
                navigate('/locationpermissions')
                navigator.geolocation.clearWatch(watchID)
                counter = 0
            }
        }
        let watchIDInterval = null
        // Start the geolocation watch interval if startGeoWatch is true.
        if(startGeoWatch) {
            watchIDInterval = setInterval(geoWatchTimer, 5000)
        }
        console.log(watchIDInterval)

        // Clear the interval and the geolocation watch on unmount.
        return () => {
            clearInterval(watchIDInterval)
            navigator.geolocation.clearWatch(id)
            console.log('end watch')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startGeoWatch])

    // Return an object with the current values of the geolocation watch and interval IDs
    return {geoWatchID, id}
}