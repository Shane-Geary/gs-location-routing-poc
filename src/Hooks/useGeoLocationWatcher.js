import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"

export const useGeoLocationWatcher = (stopGeoWatch) => {

    const navigate = useNavigate()

    const [geoWatchID, setGeoWatchID] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
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
            console.log('watch tick: ', watchID)
            setId(watchID)
        }
        let watchIDInterval = null
        if(!stopGeoWatch) {
            watchIDInterval = setInterval(geoWatchTimer, 3000)
        }
        console.log(watchIDInterval)

        return () => {
            clearInterval(watchIDInterval)
            navigator.geolocation.clearWatch(watchIDInterval)
            console.log('end watch')
        }
    }, [stopGeoWatch])

    return {geoWatchID, id}
}