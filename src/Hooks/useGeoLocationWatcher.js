import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"

/**
 * Hook that uses Geolocation API to continuously watch for the user's location.
 * @param {boolean} startGeoWatch - A boolean that indicates whether or not to start watching for location.
 * @returns {Object} An object with the IDs of the geolocation watch and interval.
 */


export const useGeoLocationWatcher = (startGeoWatch) => {

    const navigate = useNavigate()

    const [geoWatchID, setGeoWatchID] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        // Function that runs at a regular interval to watch for the user's location.
        const geoWatchTimer = () => {
            const watchID = navigator.geolocation.watchPosition(
                (success) => {
                    console.log(success)
                    setGeoWatchID(success)
                    setId(watchID)
                    navigate('/')
                    navigator.geolocation.clearWatch(watchID)
                },
                (error) => {
                    console.log(error)
                    navigate('/locationpermissions')
                    navigator.geolocation.clearWatch(watchID)
                }
            )
            console.log('geo watch tick: ', watchID)
            setId(watchID)
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