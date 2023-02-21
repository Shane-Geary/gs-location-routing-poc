import {useEffect, useRef, useState, useMemo} from 'react'

import LocationPermissions from './LocationPermissions'
import GlowstikMap from './GlowstikMap'
import RequestButton from './RequestButton'
import {useGeoLocationWatcher} from './Hooks/useGeoLocationWatcher'

import {Routes, Route, useNavigate} from 'react-router-dom'

const Navigation = () => {

    // Holding boolean value to determine whether device is ios
	const iosDeviceRef = useRef(null)
    // Holding boolean value to determine whether device is android
	const androidDeviceRef = useRef(null)

    const locationPermissionsMountedRef = useRef(false)
    const mapMountedRef = useRef(false)

    // const [geoWatchID, setGeoWatchID] = useState(null)

    const navigate = useNavigate()

    const geoWatchID = useGeoLocationWatcher()

    useEffect(()=> {
        navigate('/requestbutton')

        let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
		iosDeviceRef.current = isIOS

        const isAndroid = /Android/i.test(navigator.userAgent)
		androidDeviceRef.current = isAndroid
    }, [])

    // useGeoLocationWatcher()
    console.log(geoWatchID)

    const RequestButtonMemo = useMemo(() => (
        <RequestButton geoWatchID={geoWatchID} />
    ), [geoWatchID])

    const LocationPermissionsMemo = useMemo(() => (
        <LocationPermissions iosDeviceRef={iosDeviceRef} androidDeviceRef={androidDeviceRef} locationPermissionsMountedRef={locationPermissionsMountedRef} />
    ), [iosDeviceRef, androidDeviceRef, locationPermissionsMountedRef])

    const GlowstikMapMemo = useMemo(() => (
        <GlowstikMap mapMountedRef={mapMountedRef} geoWatchID={geoWatchID} />
    ), [mapMountedRef])

    return (
        <>
            <div>
                Coordinates of This Device: {geoWatchID ? [geoWatchID.coords.latitude, ',', geoWatchID.coords.longitude] : '.....'}
            </div>
            <Routes>
                    <Route path='requestbutton' exact element={RequestButtonMemo} />
                    <Route path='locationpermissions' exact element={LocationPermissionsMemo} />
                    <Route path='/*' exact element={GlowstikMapMemo} />
            </Routes>
        </>
    )
}

export default Navigation