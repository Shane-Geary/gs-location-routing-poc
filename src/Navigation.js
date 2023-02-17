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

    const navigate = useNavigate()

    useEffect(()=> {
        navigate('/requestbutton')

        let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
		iosDeviceRef.current = isIOS

        const isAndroid = /Android/i.test(navigator.userAgent)
		androidDeviceRef.current = isAndroid
    }, [])

    return (
        <Routes>
            <Route path='requestbutton' exact element={
                <RequestButton />
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