import {useRef, useEffect} from "react"

import {useNavigate} from "react-router-dom"


const RequestButton = () => {

    const navigate = useNavigate()

    // Holding boolean value to determine whether device is ios
	const iosDeviceRef = useRef(null)
    // Holding boolean value to determine whether device is android
	const androidDeviceRef = useRef(null)

    useEffect(() => {
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
        if(iosDeviceRef.current) {
            navigate('/locationpermissionsios')
        }
        else if(androidDeviceRef.current) {
            navigate('/locationpermissionsandroid')
        }
        else {
            navigate('/locationpermissions')
        }
        }
    }

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