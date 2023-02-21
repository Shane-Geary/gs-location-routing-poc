import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"

export const useGeoLocationWatcher = () => {

    const navigate = useNavigate()

    const [geoWatchID, setGeoWatchID] = useState(null)

    useEffect(() => {
        const geoWatchTimer = () => {
            const id = navigator.geolocation.watchPosition(
                (success) => {
                    console.log(success)
                    setGeoWatchID(success)
                    navigate('/')
                    navigator.geolocation.clearWatch(id)
                },
                (error) => {
                    console.log(error)
                    navigate('/locationpermissions')
                    navigator.geolocation.clearWatch(id)
                }
            )
            console.log('watch tick: ', id)
        }

        const watchID = setInterval(geoWatchTimer, 3000)
        console.log(watchID)

        return () => {
            clearInterval(watchID)
            navigator.geolocation.clearWatch(watchID)
            console.log('end watch')
        }
    }, [])

    return geoWatchID
}