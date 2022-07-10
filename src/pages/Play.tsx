import { createEffect, createSignal } from "solid-js"
import * as THREE from "three"
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
    const [initOrt, setInitOrt] = createSignal<Orientation>({
        "alpha": 0,
        "beta": 0,
        "gamma": 0
    })
    const eventLister = (e: DeviceOrientationEvent) => {
        setOrientation((_) => {
            const alpha = e.alpha || 0
            const beta = e.beta || 0
            const gamma = e.gamma || 0
            return { alpha, beta, gamma }
        })
    }
    const debag = () => {
        const alpha = Math.round(orientation()["alpha"] * 10) / 10
        const beta = Math.round(orientation()["beta"] * 10) / 10
        const gamma = Math.round(orientation()["gamma"] * 10) / 10
        return {
            alpha, beta, gamma
        }
    }
    const permitOrientation = async () => {
        if (typeof (DeviceOrientationEvent) !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
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
        const qt = new THREE.Quaternion()
        const beta = THREE.MathUtils.degToRad(orientation().beta)
        const alpha = THREE.MathUtils.degToRad(orientation().alpha)
        const gamma = THREE.MathUtils.degToRad(-orientation().gamma)
        const euler = new THREE.Euler()
        euler.set(beta, gamma, alpha, "ZXY")
        qt.setFromEuler(euler)

        const base = new THREE.Quaternion()
        base.setFromAxisAngle(new THREE.Vector3(qt.x, 0, qt.z), qt.w)
        console.log(qt)
        const r = base.angleTo(qt)
        console.log(r)
        console.log(10 / Math.PI * r + "度")
    })

    return (
        <div style={{ fontSize: "50px" }}>
            <div>play!</div>
            <div>a: {debag().alpha}</div>
            <div>b: {debag().beta}</div>
            <div>g: {debag().gamma}</div>
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