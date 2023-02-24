import {useEffect, useState} from "react"

// TODO: Convert watchPosition to async syntax - The watchPosition call does not naturally return a promise. Attempting to wrap this call in a promise and restructure accordingly to async/await syntax has resulted in the set interval not ticking at it's time signature as we are having to await the geo location on success in order to continue the logic. 

/** Info on this provided by ChatGPT - 'If your use case is to run watchPosition at a regular interval, then using callbacks might be more appropriate than wrapping it in a promise. This is because watchPosition continuously watches for the user's position, and using a callback allows you to receive updates whenever the position changes.

Using a promise with watchPosition would only provide a single update of the user's position, rather than continuous updates. This could result in outdated location information if the user moves after the initial promise resolves.

However, if you do decide to use callbacks, it's important to make sure that you clear the watch using clearWatch when the component unmounts, to prevent unnecessary resource usage.'
*/

/**
 * Custom React hook that uses Geolocation API to continuously watch for the user's location.
 * @param {boolean} startGeoWatch - A boolean that indicates whether or not to start watching for location.
 * @returns {Object} An object with the IDs of the geolocation watch and interval.
 */


export const useGeoLocationWatcher = (startGeoWatch, onSuccess, onError) => {

    // State variables for the geolocation watch ID and interval ID
    const [geoWatchID, setGeoWatchID] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
		let newCounter = 0
        const geoWatchTimer = (counter) => {
            // Watch for the user's position using the Geolocation API.
            const watchID = navigator.geolocation.watchPosition(
                // On success, set coordinates to geoWatchID state, navigate to map, clear watch and reset counter to 0
                (success) => {
                    console.log(success)
                    setGeoWatchID(success)
                    setId(watchID)
					onSuccess(success)
                    navigator.geolocation.clearWatch(watchID)
                    newCounter = 0
                },
                // On error, set geoWatchID back to null, navigate to LocationPermissions, clear watch and reset counter to 0
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

            // If no response is received after 5 attempts, redirect to the location permissions page.
            if(counter >= 5) {
                console.log('error: no response from geolocation')
                setGeoWatchID(null)
				onError()
                navigator.geolocation.clearWatch(watchID)
                newCounter = 0
            }
            return newCounter
        }
        if(startGeoWatch) {
            // Function that runs at a regular interval to watch for the user's location.
            let counter = 0
            // Start the geolocation watch interval if startGeoWatch is true.
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