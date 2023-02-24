import {useGeoLocationRequest} from "./Hooks/useGeoLocationRequest"

import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/
import {useNavigate} from "react-router-dom"

// TODO: Have interval - at the start, register geo watch - at the end, de-register watch and run request - if that returns denied, re-route to LocationPermissions

/**
* Renders a button that, when clicked, prompts the user for geolocation and navigates to home page if successful or location permissions page if not
* @returns {function} - React functional component
*/

const RequestButton = () => {

    // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

    const navigate = useNavigate()

    const onSuccess = (position) => {
        console.log(position)
        navigate('/*')
    }

    const onError = (error) => {
        console.log(error)
        navigate('/locationpermissions')
    }

    const geoLocationRequest = useGeoLocationRequest(onSuccess, onError)

    return (
        <div className={classes.wrapper}>
            <button
                className={classes.button}
                onClick={() => {
                    geoLocationRequest()
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