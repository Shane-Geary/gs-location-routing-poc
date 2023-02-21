import {useEffect, useRef, useState, useMemo} from 'react'

import LocationPermissions from './LocationPermissions'
import GlowstikMap from './GlowstikMap'
import RequestButton from './RequestButton'
import {useGeoLocationWatcher} from './Hooks/useGeoLocationWatcher'

import {Routes, Route, useNavigate} from 'react-router-dom'
import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/
import {Switch} from '@mui/material'

const Navigation = () => {

     // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

    // Holding boolean value to determine whether device is ios
	const iosDeviceRef = useRef(null)
    // Holding boolean value to determine whether device is android
	const androidDeviceRef = useRef(null)

    const locationPermissionsMountedRef = useRef(false)
    const mapMountedRef = useRef(false)

    const [stopGeoWatch, setStopGeoWatch] = useState(false)

    const navigate = useNavigate()

    const {geoWatchID, id} = useGeoLocationWatcher(stopGeoWatch)

    useEffect(()=> {
        navigate('/requestbutton')

        let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
		iosDeviceRef.current = isIOS

        const isAndroid = /Android/i.test(navigator.userAgent)
		androidDeviceRef.current = isAndroid
    }, [])

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
            <div className={classes.coordWrapper}>
                <div className={classes.coordCopyWrapper}>
                    <div className={classes.coordCopy}>
                        Coordinates of This Device: {geoWatchID ? [geoWatchID.coords.latitude, ',', geoWatchID.coords.longitude] : '.....'}
                    </div>
                    <div className={classes.tickerCopy}>
                        Watch Position Tick Count: {id} {stopGeoWatch ? '[PAUSED]' : null}
                    </div>
                    <div className={classes.geoWatchSwitch}>
                        {stopGeoWatch ? 'Start' : 'Stop'} Geo Watch: &gt;
                        <Switch
                            // defaultChecked
                            onChange={() => {
                                setStopGeoWatch(!stopGeoWatch)
                                if(!stopGeoWatch) {
                                    navigate('/requestbutton')
                                }
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '20px',
    },
    coordCopyWrapper: {
        border: '2px solid black',
        borderRadius: '10px',
        width: '30%',
        alignSelf: 'center',
        lineHeight: '200%',
        backgroundColor: 'rgba(128, 128, 128, .4)'
    },
    coordCopy: {
        textDecoration: 'underline'
    },
    tickerCopy: {
       textAlign: 'left',
       marginLeft: '5px'
    },
    geoWatchSwitch: {
        textAlign: 'left',
        marginLeft: '5px'
    }
}))

export default Navigation