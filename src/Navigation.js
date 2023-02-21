import {useEffect, useRef, useState} from 'react'

import LocationPermissions from './LocationPermissions'
import GlowstikMap from './GlowstikMap'
import RequestButton from './RequestButton'

import {Routes, Route, useNavigate} from 'react-router-dom'

const Navigation = () => {

    // Holding boolean value to determine whether device is ios
	const iosDeviceRef = useRef(null)
    // Holding boolean value to determine whether device is android
	const androidDeviceRef = useRef(null)

    const [geoWatchID, setGeoWatchID] = useState(null)

    const navigate = useNavigate()

    useEffect(()=> {
        navigate('/requestbutton')

        let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
		iosDeviceRef.current = isIOS

        const isAndroid = /Android/i.test(navigator.userAgent)
		androidDeviceRef.current = isAndroid
    }, [])

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

    const geoWatchTimer = () => {
        const id = navigator.geolocation.watchPosition(
            (success) => {
                console.log(success)
                setGeoWatchID(success)
                navigate('/')
            },
            (error) => {
                console.log(error)
                navigate('/locationpermissions')
            }
        )
        locationRequest()
        console.log('watch tick: ', id)
        console.log(geoWatchID)
    }

    useEffect(() => {
        const watchID = setInterval(geoWatchTimer, 3000)

        console.log(geoWatchID)

        return () => {
            clearInterval(watchID)
            navigator.geolocation.clearWatch(watchID)
            console.log('end watch')
        }
    }, [geoWatchID])

    return (
        <Routes>
            <Route path='requestbutton' exact element={
                <RequestButton geoWatchID={geoWatchID} />
            }/>
            <Route path='locationpermissions' exact element={
                <LocationPermissions iosDeviceRef={iosDeviceRef} androidDeviceRef={androidDeviceRef} />
            }/>
            <Route path='/*' exact element={
                <GlowstikMap />
            }/>
      </Routes>
    )
}

export default Navigation