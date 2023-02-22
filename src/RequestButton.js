import {useGeoLocationRequest} from "./Hooks/useGeoLocationRequest"

import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/

// TODO: Have interval - at the start, register geo watch - at the end, de-register watch and run request - if that returns denied, re-route to LocationPermissions

/**
* Renders a button that, when clicked, prompts the user for geolocation and navigates to home page if successful or location permissions page if not
* @returns {function} - React functional component
*/

const RequestButton = () => {
    
    const geoLocationRequest = useGeoLocationRequest()

    // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

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