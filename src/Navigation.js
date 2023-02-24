import {useRef, useState, useMemo} from 'react'

import LocationPermissions from './LocationPermissions'
import GlowstikMap from './GlowstikMap'
import RequestButton from './RequestButton'
import {useGeoLocationWatcher} from './Hooks/useGeoLocationWatcher'
import {useDeviceInfo} from './Hooks/useDeviceInfo'

import {Routes, Route, useNavigate} from 'react-router-dom'
import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/
import {Switch} from '@mui/material'

/**
 * This component renders when waiting for geolocation from the user's device and handles routing.
 * @returns {function} React functional component
 */

const Navigation = () => {

    // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

    const navigate = useNavigate()

    // Refs to hold boolean values that determine whether components have mounted.
    const locationPermissionsMountedRef = useRef(null)
    const mapMountedRef = useRef(null)

    // State that determines whether to start or stop geolocation watcher.
    const [startGeoWatch, setStartGeoWatch] = useState(false)

    // Call useDeviceInfo hook to get user's device.
    const {iosDevice, androidDevice} = useDeviceInfo()

    // Callback invoked from useGeolocationWatcher hook when response is success.
    const onSuccess = (position) => {
        console.log(position)
        navigate('/*')
    }

    // Callback invoked from useGeolocationWatcher hook when response is error.
    const onError = (error) => {
        console.log(error)
        navigate('/locationpermissions')
    }

    // Call useGeoLocationWatcher hook to get geolocation data.
    const {geoWatchID, id} = useGeoLocationWatcher(startGeoWatch, onSuccess, onError)

    // Memoized components to prevent uneccessary re-renders.
    const RequestButtonMemo = useMemo(() => (
        <RequestButton />
    ), [])

    const LocationPermissionsMemo = useMemo(() => (
        <LocationPermissions iosDevice={iosDevice} androidDevice={androidDevice} locationPermissionsMountedRef={locationPermissionsMountedRef} />
    ), [iosDevice, androidDevice, locationPermissionsMountedRef])

    const GlowstikMapMemo = useMemo(() => (
        <GlowstikMap mapMountedRef={mapMountedRef} />
    ), [mapMountedRef])

    return (
        <>
            <div className={classes.coordWrapper}>
                <div className={classes.coordCopyWrapper}>
                    <div className={classes.coordCopy}>
                        Coordinates of This Device: {geoWatchID ? [geoWatchID.coords.latitude, ',', geoWatchID.coords.longitude] : '.....'}
                    </div>
                    <div className={classes.tickerCopy}>
                       <span>Watch Position Tick Count: </span><span className={classes.id}>{id}</span> {startGeoWatch ? '[5s interval]' : '[PAUSED]'}
                    </div>
                    <div className={classes.geoWatchSwitch}>
                        {startGeoWatch ? 'Stop' : 'Start'} Geo Watch: &gt;
                        <Switch
                            onChange={() => {
                                setStartGeoWatch(!startGeoWatch)
                            }}
                        />
                    </div>
                </div>
            </div>
            <Routes>
                    <Route path='requestbutton' exact element={RequestButtonMemo} />
                    <Route path='locationpermissions' exact element={LocationPermissionsMemo} />
                    <Route path='/*' exact element={GlowstikMapMemo} />
            </Routes>
        </>
    )
}

const useStyles = makeStyles()((_, props) => ({
    coordWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '20px',
    },
    coordCopyWrapper: {
        border: '2px solid black',
        borderRadius: '10px',
        width: '50%',
        alignSelf: 'center',
        lineHeight: '200%',
        backgroundColor: 'rgba(128, 128, 128, .4)',
    },
    coordCopy: {
        textDecoration: 'underline'
    },
    tickerCopy: {
       textAlign: 'left',
       marginLeft: '5px',
    },
    geoWatchSwitch: {
        textAlign: 'left',
        marginLeft: '5px'
    },
    id: {
        color: '#ED2290',
        fontWeight: 'bold'
    }
}))

export default Navigation