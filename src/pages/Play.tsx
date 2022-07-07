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
        window.addEventListener("deviceorientation", ({
            alpha,
            beta,
            gamma
        }) => {
            setOrientation({
                alpha: alpha || 0,
                beta: beta || 0,
                gamma: gamma || 0
            })
        }, true)
        setUseOrientationStates((p) => {
            return {...p, isEnable: true}
        })
    }
    createEffect(() => {
        console.log("calc!")
    })

    return (
        <div>
            <div>play!</div>
            <div>{JSON.stringify(orientation())}</div>
            {
                useOrientationStates()["isEnable"] ? <></> : <input type="submit" value={"start"} onclick={permitOrientation} />
            }
        </div>
    )
}