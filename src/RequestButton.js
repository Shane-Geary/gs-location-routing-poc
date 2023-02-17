import {useNavigate} from "react-router-dom"


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
                width: '100%',
                border: '2px solid black'
            }}
        >
            <button
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