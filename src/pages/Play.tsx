import { createSignal } from "solid-js"

export default function Play() {
    const [isEnable, setEnable] = createSignal(false)
    const [motion, setMotion] = createSignal("no")
    // DeviceOrientationEvent.prototype.
    const iosPermission = async () => {
        if (typeof( DeviceMotionEvent ) !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            const res = await (DeviceOrientationEvent as any).requestPermission()
            if (res !== "granted") {
                return setMotion("You can not use.")
            }
        }
        window.addEventListener("deviceorientation", event => {
            console.log(event)
            setMotion(JSON.stringify(event["beta"]))
        }, true)
        setEnable(true)
    }

    return (
        <div style={{ backgroundColor: "#666" }}>
            <div>play!</div>
            <p>{motion()}</p>
            {
                isEnable()? <></>: <input type="submit" value={"start"} onclick={iosPermission}/>
            }
        </div>
    )
}