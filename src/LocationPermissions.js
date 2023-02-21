import {useEffect} from "react"

const LocationPermissions = ({iosDeviceRef, androidDeviceRef, locationPermissionsMountedRef}) => {
    console.log('location screen')

    useEffect(() => {
        locationPermissionsMountedRef.current = true
        return () => {
            locationPermissionsMountedRef.current = false
        }
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
                width: '100%'
            }}
        >
            <div
                style={{border: '2px solid black'}}
            >
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

export default LocationPermissions