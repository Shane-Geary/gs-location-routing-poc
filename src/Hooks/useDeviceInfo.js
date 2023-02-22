import {useEffect, useRef} from "react"
import {useNavigate} from "react-router-dom"

export const useDeviceInfo = () => {
    const navigate = useNavigate()
    const iosDeviceRef = useRef(false)
    const androidDeviceRef = useRef(false)

    useEffect(() => {
        // Navigate to RequestButton page on mount.
        navigate('/requestbutton')

        // Determine whether device is an iOS or Android device.
        let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        iosDeviceRef.current = isIOS
        const isAndroid = /Android/i.test(navigator.userAgent)
        androidDeviceRef.current = isAndroid
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {iosDevice: iosDeviceRef.current, androidDevice: androidDeviceRef.current, navigateHome: navigate}
}