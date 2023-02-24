import {useNavigate} from "react-router-dom"

/**
Custom React hook for requesting geolocation permission and navigation
* @returns {Function} - A function that when invoked, prompts the user for geolocation permission and navigates to either the Glowstik map or the location permissions page based on the permission status.
*/

export const useGeoLocationRequest = (onSuccess, onError) => {

    const navigate = useNavigate()

    // Prompts the user for geolocation and navigates to Glowstik map if successful or location permissions page if not
    const locationRequest = async () => {
        try{
            const geoPosition = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true})
            })
            console.log(geoPosition)
            // navigate('/')
            onSuccess()
        }
        catch(error) {
            console.log(error)
            // navigate('/locationpermissions')
            onError()
        }
    }
    return locationRequest
}