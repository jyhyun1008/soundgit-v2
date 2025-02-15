'use client'
import { useState } from "react";
import MarkedParser from "./MarkedParser";

export default function About() {

    const [raw, setRaw] = useState('')
    
    fetch(`https://raw.githubusercontent.com/${process.env.NEXT_PUBLIC_GITHUB}/${process.env.NEXT_PUBLIC_REPO}/main/README.md`)
    .then(res => res.text())
    .then((out) => {
        setRaw(out)
    })

    return (
        <>
            <div id="player-list" className="mainbox">
                <div id="player-overflow">
                <MarkedParser raw={raw}/>
                </div>
            </div>
        </>
    );
}
