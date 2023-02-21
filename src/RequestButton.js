import {useNavigate} from "react-router-dom"

// TODO: Have interval - at the start, register geo watch - at the end, de-register watch and run request - if that returns denied, re-route to LocationPermissions

const RequestButton = () => {

    const navigate = useNavigate()

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
            <button
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    border: '2px solid black'
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