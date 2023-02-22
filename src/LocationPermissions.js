import {useEffect} from "react"

import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/

/**
This component renders a screen for location permissions, depending on the user's device
* @param {Object} iosDeviceRef - Reference to a ref object for iOS devices
* @param {Object} androidDeviceRef - Reference to a ref object for Android devices
* @param {Object} locationPermissionsMountedRef - Reference to a ref object for location permissions component
* @returns {function} - React functional component
*/

const LocationPermissions = ({iosDeviceRef, androidDeviceRef, locationPermissionsMountedRef}) => {
    console.log('location screen')

    // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

    useEffect(() => {
        locationPermissionsMountedRef.current = true
        return () => {
            locationPermissionsMountedRef.current = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                {iosDeviceRef.current && 'LOCATION PERMISSIONS IOS'}
                {androidDeviceRef.current && 'LOCATION PERMSSIONS ANDROID'}
                {
                    !iosDeviceRef.current && !androidDeviceRef.current ?
                    'LOCATION PERMISSIONS'
                    :
                    null
                }
            </div>
        </div>
    )
}

const useStyles = makeStyles()((_, props) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%'
    },
    container: {border: '2px solid black'}
}))

export default LocationPermissions