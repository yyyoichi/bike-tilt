import { createEffect, createSignal } from "solid-js"
type Orientation = {
    "alpha": number,
    "beta": number,
    "gamma": number,
}
type UseOrientationStates = {
    isEnable: boolean,
    message: string
}
export default function Play() {
    const [useOrientationStates, setUseOrientationStates] = createSignal<UseOrientationStates>({
        isEnable: false,
        message: ""
    })
    const [orientation, setOrientation] = createSignal<Orientation>({
        "alpha": 0,
        "beta": 0,
        "gamma": 0
    })
    const eventLister = (event: DeviceOrientationEvent) => {
        const alpha = Math.round(event["alpha"] ? event["alpha"] * 10 : 10) / 10
        const beta = Math.round(event["beta"] ? event["beta"] * 10 : 10) / 10
        const gamma = Math.round(event["gamma"] ? event["gamma"] * 10 : 10) / 10
        setOrientation({ alpha, beta, gamma })
    }
    const permitOrientation = async () => {
        if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            const res = await (DeviceOrientationEvent as any).requestPermission()
            if (res !== "granted") {
                return setUseOrientationStates(p => {
                    return {
                        ...p,
                        "message": "検知を許可してください"
                    }
                })
            }
        }
        /**
         * 傾き検知時に起動
         */
        window.addEventListener("deviceorientation", eventLister, true)
        setUseOrientationStates((p) => {
            return { ...p, isEnable: true }
        })
    }
    const closeOrientation = () => {
        window.removeEventListener("deviceorientation", eventLister, true)
        setUseOrientationStates((p) => {
            return { ...p, isEnable: false }
        })
    }
    createEffect(() => {
        console.log("calc!")
    })

    return (
        <div style={{ fontSize: "50px" }}>
            <div>play!</div>
            <div>a: {orientation().alpha}</div>
            <div>b: {orientation().beta}</div>
            <div>g: {orientation().gamma}</div>
            {
                useOrientationStates()["isEnable"] ? <input
                    type="submit"
                    value="end"
                    onClick={closeOrientation} /> : <input
                    type="submit"
                    value={"start"}
                    onclick={permitOrientation} />
            }
        </div>
    )
}