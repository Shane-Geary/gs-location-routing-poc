import {useEffect} from "react"

import {makeStyles} from 'tss-react/mui' // https://react-redux.js.org/

const GlowstikMap = ({mapMountedRef, geoWatchID}) => {
    console.log('MAP')

    // Call useStyles hook and store the return value in a const
	const {classes} = useStyles(
		{}
	)

    useEffect(() => {
        mapMountedRef.current = true
        return () => {
            mapMountedRef.current = false
        }
    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                MAP
            </div>
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
    container: {border: '2px solid black'}
}))

export default GlowstikMap