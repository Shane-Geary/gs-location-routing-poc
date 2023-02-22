import {useNavigate} from "react-router-dom"
import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/

// TODO: Have interval - at the start, register geo watch - at the end, de-register watch and run request - if that returns denied, re-route to LocationPermissions

/**
* Renders a button that, when clicked, prompts the user for geolocation and navigates to home page if successful or location permissions page if not
* @returns {function} - React functional component
*/

const RequestButton = () => {

    const navigate = useNavigate()

    // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

    // Prompts the user for geolocation and navigates to Glowstik map if successful or location permissions page if not
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
        <div className={classes.wrapper}>
            <button
                className={classes.button}
                onClick={() => {
                    locationRequest()
                }}
            >
                Request Location
            </button>
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
    button: {
        position: 'absolute',
        alignSelf: 'center',
        border: '2px solid black'
    }
}))

export default RequestButton