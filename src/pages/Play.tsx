import { createEffect, createSignal } from "solid-js"
import * as THREE from "three"
type Acceleration = {
    "x": number,
    "y": number,
    "z": number,
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
    const [aclInGrb, setAclIngrb] = createSignal<Acceleration>({
        "x": 0,
        "y": 0,
        "z": 0
    })
    const [acceleration, setAcceleration] = createSignal<Acceleration>({
        "x": 0,
        "y": 0,
        "z": 0
    })
    const [initAcl, setInitAcl] = createSignal<Acceleration>({
        "x": 0,
        "y": 0,
        "z": 0
    })
    const eventLister = (e: DeviceMotionEvent) => {
        const { accelerationIncludingGravity: aclInG } = e
        setAclIngrb((_) => {
            const x = aclInG?.x || 0
            const y = aclInG?.y || 0
            const z = aclInG?.z || 0
            return { x, y, z }
        })
        const { acceleration: acl } = e
        setAcceleration((_) => {
            const x = acl?.x || 0
            const y = acl?.y || 0
            const z = acl?.z || 0
            return { x, y, z }
        })
    }
    const debag = () => {
        const gx = aclInGrb().x
        const gy = aclInGrb().y
        const gz = aclInGrb().z
        const gg = Math.sqrt(gx * gx + gy * gy + gz * gz)
        const gtheta = 180 / Math.PI * Math.acos(-gz / gg)

        const x = acceleration().x
        const y = acceleration().y
        const z = acceleration().z
        const g = Math.sqrt(x * x + y * y + z * z)
        const theta = 180 / Math.PI * Math.acos(-z / g)


        return {
            x, y, z, theta, gx, gy, gz, gtheta
        }
    }
    const permitOrientation = async () => {
        if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
            const res = await (DeviceMotionEvent as any).requestPermission()
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
        window.addEventListener("devicemotion", eventLister, true)
        setUseOrientationStates((p) => {
            return { ...p, isEnable: true }
        })
    }
    const closeOrientation = () => {
        window.removeEventListener("devicemotion", eventLister, true)
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
            <div>重力加速度含まない加速度</div>
            <div>x: {debag().x}</div>
            <div>y: {debag().y}</div>
            <div>z: {debag().z}</div>
            <div>theta: {debag().theta}</div>
            <p></p>
            <div>重力加速度</div>
            <div>x: {debag().gx}</div>
            <div>y: {debag().gy}</div>
            <div>z: {debag().gz}</div>
            <div>theta: {debag().gtheta}</div>
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