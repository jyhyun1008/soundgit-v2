'use client'
import ImageWithFallback from "./ImageWithFallback";
import { useState, useRef } from "react";

export default function List({list, nowPlaying}) {
    
    const musicList = list
    const [nowPlay, setNowPlay] = useState('')

    function nowPlayChange(music) {
        setNowPlay(music)
    }

    return (
        <>
            <div id="player-list" className="mainbox musicList">
                <div id="player-overflow">
                <p ref={nowPlaying} style={{display: 'none'}}>{nowPlay}</p>
                    {musicList.map((music, index)=>(
                        <div className="play-title-box" key={index} onClick={() => nowPlayChange(music)}>
                            {   nowPlay == music
                                ?<div className="play-play-box nowplaying" id={`playbox${index}`}>
                                <div className="play-img-box">
                                    <ImageWithFallback src={`/img/${music}.png`} fallback='/logo.png' />
                                </div>
                                <div className="play-info-box">
                                    <div className="play-title">{music.split('.')[0].split('_')[1].replace(/\-/gm, ' ')}</div>
                                    <div className="play-user">{music.split('_')[0]} · {process.env.NEXT_PUBLIC_ARTIST}</div>
                                </div>
                            </div>
                                :<div className="play-play-box" id={`playbox${index}`}>
                                <div className="play-img-box">
                                    <ImageWithFallback src={`/img/${music}.png`} fallback='/logo.png' />
                                </div>
                                <div className="play-info-box">
                                    <div className="play-title">{music.split('.')[0].split('_')[1].replace(/\-/gm, ' ')}</div>
                                    <div className="play-user">{music.split('_')[0]} · {process.env.NEXT_PUBLIC_ARTIST}</div>
                                </div>
                            </div>
                            }
                            
                            <div className="play-link-box" id={music}>
                                <i className='bx bx-chevron-right' ></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
