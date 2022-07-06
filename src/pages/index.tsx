import { Link } from "solid-app-router";

export default function Top() {
    return (
        <div>
            <h1>Hello world</h1>
            <h2><Link href="/play" >start</Link></h2>
        </div>
    )
}