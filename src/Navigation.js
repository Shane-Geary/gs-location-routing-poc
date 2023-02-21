import {useEffect, useRef, useState, useMemo} from 'react'

import LocationPermissions from './LocationPermissions'
import GlowstikMap from './GlowstikMap'
import RequestButton from './RequestButton'

import {Routes, Route, useNavigate} from 'react-router-dom'

const Navigation = () => {

    // Holding boolean value to determine whether device is ios
	const iosDeviceRef = useRef(null)
    // Holding boolean value to determine whether device is android
	const androidDeviceRef = useRef(null)
    const locationPermissionsMountedRef = useRef(false)
    const mapMountedRef = useRef(false)

    const [geoWatchID, setGeoWatchID] = useState(null)

    const navigate = useNavigate()

    useEffect(()=> {
        navigate('/requestbutton')

        let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
		iosDeviceRef.current = isIOS

        const isAndroid = /Android/i.test(navigator.userAgent)
		androidDeviceRef.current = isAndroid
    }, [])

    const geoWatchTimer = () => {
        const id = navigator.geolocation.watchPosition(
            (success) => {
                console.log(success)
                setGeoWatchID(success)
                // if(!mapMountedRef.current) {
                    navigate('/')
                // }
                navigator.geolocation.clearWatch(id)
            },
            (error) => {
                console.log(error)
                // if(!locationPermissionsMountedRef.current) {
                    navigate('/locationpermissions')
                // }
                navigator.geolocation.clearWatch(id)
            }
        )
        console.log('watch tick: ', id)
        console.log(mapMountedRef)
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

    const RequestButtonMemo = useMemo(() => (
        <RequestButton geoWatchID={geoWatchID} />
    ), [geoWatchID])

    const LocationPermissionsMemo = useMemo(() => (
        <LocationPermissions iosDeviceRef={iosDeviceRef} androidDeviceRef={androidDeviceRef} locationPermissionsMountedRef={locationPermissionsMountedRef} />
    ), [iosDeviceRef, androidDeviceRef, locationPermissionsMountedRef])

    const GlowstikMapMemo = useMemo(() => (
        <GlowstikMap mapMountedRef={mapMountedRef} />
    ), [mapMountedRef])

    return (
        <Routes>
            <Route path='requestbutton' exact element={RequestButtonMemo}/>
            <Route path='locationpermissions' exact element={LocationPermissionsMemo}/>
            <Route path='/*' exact element={GlowstikMapMemo}/>
      </Routes>
    )
}

export default Navigation