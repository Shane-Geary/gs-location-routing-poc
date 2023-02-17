import {useEffect} from 'react'

import LocationPermissions from './LocationPermissions'
import LocationPermissionsIOS from './LocationPermissionsIOS'
import GlowstikMap from './GlowstikMap'
import RequestButton from './RequestButton'

import {Routes, Route, useNavigate} from 'react-router-dom'

const Navigation = () => {

    const navigate = useNavigate()

    useEffect(()=> {
        navigate('/requestbutton')
    }, [])

    return (
        <Routes>
            <Route path='requestbutton' exact element={
            <RequestButton />
            }/>
            <Route path='locationpermissions' exact element={
            <LocationPermissions />
            }/>
            <Route path='locationpermissionsIOS' exact element={
            <LocationPermissionsIOS />
            }/>
            <Route path='/*' exact element={
            <GlowstikMap />
            }/>
      </Routes>
    )
}

export default Navigation