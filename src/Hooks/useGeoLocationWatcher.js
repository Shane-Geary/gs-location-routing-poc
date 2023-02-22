import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"

/**
 * Custom React hook that uses Geolocation API to continuously watch for the user's location.
 * @param {boolean} startGeoWatch - A boolean that indicates whether or not to start watching for location.
 * @returns {Object} An object with the IDs of the geolocation watch and interval.
 */


export const useGeoLocationWatcher = (startGeoWatch) => {

    const navigate = useNavigate()

    const [geoWatchID, setGeoWatchID] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        // Function that runs at a regular interval to watch for the user's location.
        let counter = 0
        const geoWatchTimer = () => {
            const watchID = navigator.geolocation.watchPosition(
                (success) => {
                    console.log(success)
                    setGeoWatchID(success)
                    setId(watchID)
                    navigate('/')
                    navigator.geolocation.clearWatch(watchID)
                    counter = 0
                },
                (error) => {
                    console.log(error)
                    navigate('/locationpermissions')
                    navigator.geolocation.clearWatch(watchID)
                    counter = 0
                }
            )
            console.log('geo watch tick: ', watchID)
            setId(watchID)

            counter++

            if(counter >= 5) {
                console.log('error: no response from geolocation')
                navigate('/locationpermissions')
                navigator.geolocation.clearWatch(watchID)
                counter = 0
            }
        }
        let watchIDInterval = null
        if(startGeoWatch) {
            watchIDInterval = setInterval(geoWatchTimer, 5000)
        }
        console.log(watchIDInterval)

        return () => {
            clearInterval(watchIDInterval)
            navigator.geolocation.clearWatch(id)
            console.log('end watch')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startGeoWatch])

    return {geoWatchID, id}
}