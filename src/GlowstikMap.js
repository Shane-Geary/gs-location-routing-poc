import {useEffect} from "react"

const GlowstikMap = ({mapMountedRef}) => {
    console.log('MAP')

    useEffect(() => {
        mapMountedRef.current = true
        return () => {
            mapMountedRef.current = false
        }
    }, [])

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
            <div
                style={{border: '2px solid black'}}
            >
                MAP
            </div>
        </div>
    )
}

export default GlowstikMap