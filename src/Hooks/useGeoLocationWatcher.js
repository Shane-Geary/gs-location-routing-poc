import {useEffect, useState} from "react"


/**
 * Custom React hook that uses Geolocation API to continuously watch for the user's location.
 * @param {boolean} startGeoWatch - A boolean that indicates whether or not to start watching for location.
 * @param {function} onSuccess - A callback function that will be called when the geolocation watch is successful.
 * @param {function} onError - A callback function that will be called when the geolocation watch encounters an error.
 * @returns {Object} An object with the IDs of the geolocation watch and interval.
 */


export const useGeoLocationWatcher = (startGeoWatch, onSuccess, onError) => {

    // State variables for the geolocation watch ID and interval ID
    const [geoWatchID, setGeoWatchID] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
		let newCounter = 0
        const geoWatchTimer = async (counter) => {
            // Watch for the user's position using the Geolocation API.
            const watchID = await navigator.geolocation.watchPosition(
                // On success, set coordinates to geoWatchID state, call the onSuccess callback, clear watch and reset counter to 0
                (success) => {
                    console.log(success)
                    setGeoWatchID(success)
                    setId(watchID)
					onSuccess(success)
                    navigator.geolocation.clearWatch(watchID)
                    newCounter = 0
                },
                // On error, set geoWatchID back to null, call the onError callback, clear watch and reset counter to 0
                (error) => {
                    console.log(error)
                    setGeoWatchID(null)
					onError(error)
                    navigator.geolocation.clearWatch(watchID)
                    newCounter = 0
                }
            )
            console.log('geo watch tick: ', watchID)
            // This will keep track of the number of calls made to watch geolocation
            setId(watchID)

            newCounter++
			console.log(counter)

            // If no response is received after 5 attempts, invoke the onError callback.
            if(counter >= 5) {
                console.log('error: no response from geolocation')
                setGeoWatchID(null)
				onError()
                navigator.geolocation.clearWatch(watchID)
                newCounter = 0
            }
            return newCounter
        }
		// Start the geolocation watch interval if startGeoWatch is true.
        if(startGeoWatch) {
            let counter = 0
            const watchIDInterval = setInterval(()=>{
                counter = geoWatchTimer(counter)
            }, 5000)
            console.log(watchIDInterval)

            // Clear the interval and the geolocation watch on unmount.
            return () => {
                clearInterval(watchIDInterval)
                navigator.geolocation.clearWatch(id)
                console.log('end watch')
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startGeoWatch])

    // Return an object with the current values of the geolocation watch and interval IDs
    return {geoWatchID, id}
}