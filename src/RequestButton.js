import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"

// TODO: Have interval - at the start, register geo watch - at the end, de-register watch and run request - if that returns denied, re-route to LocationPermissions

const RequestButton = () => {

    const navigate = useNavigate()

    const [geoWatchID, setGeoWatchID] = useState({id: 0})

    const locationRequest = async () => {
        try{
        const geoPosition = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true})
        })
        console.log(geoPosition)
        navigate('/')
        }
        catch(error) {
        console.log(error)
        navigate('/locationpermissions')
        }
    }

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition((success, error) => {
            console.log(success)
            setGeoWatchID({id: success})
        })
        const geoWatchInterval = setInterval(() => {
            locationRequest()
            navigator.geolocation.clearWatch(watchId)
        }, 5000)

        console.log(geoWatchInterval)
        console.log(geoWatchID)

        return () => {
            clearInterval(geoWatchInterval)
            navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    // console.log(geoWatchID)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
                width: '100%',
                border: '2px solid black'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                }}
            >
                Watch ID: {geoWatchID.id.toString()}
            </div>
            <button
                style={{
                    position: 'absolute',
                    alignSelf: 'center'
                }}
                onClick={() => {
                    locationRequest()
                }}
            >
                Request Location
            </button>
        </div>
    )
}

export default RequestButton