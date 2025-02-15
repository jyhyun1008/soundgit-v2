'use client'
import ImageWithFallback from "./ImageWithFallback";
import { useState, useRef } from "react";

export default function PlayerBox(props) {
    
    const music = props.nowPlay
    const audioRef = useRef('');

    const defaultImgSrc = '/logo.png'

    var playList = [] //json
    var sPlayList = []
    const [isShuffle, setIsShuffle] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playPause, setPlayPause] = useState('right-arrow')
    const [isLoop, setIsLoop] = useState(true)
    const [volume, setVolume] = useState(1)
    var currentPlaying = {}
    const [isFirstPlay, setIsFirstPlay] = useState(true)


    const playBarContoller = function () {
        const timeAudio = () => {
            const duration = audioRef.current.duration || 0;
            const timeBar = document.querySelector('#duration')
            const totTime = document.querySelector('#totTime')
            const playTime = document.querySelector('#playTime')
            const tick = duration / 100
            //전체시간 표시
            // 음원 총 재생시간 구하기
            const min = Math.floor(duration / 60);
            const sec = Math.floor(duration % 60);
            const totMin = min.toString().padStart(2, "0");
            const totSec = sec.toString().padStart(2, "0");
            totTime.innerText = `${totMin}:${totSec}`

            // 현재시간 표시
            audioplayer.addEventListener("timeupdate", (event) => {
                //const playTime = $(".current");
                let ctTime = parseInt(audioplayer.currentTime)
                // 프로그레스 바 업데이트
                timeBar.value = `${ctTime / tick}`
                let min = Math.floor(ctTime / 60);
                let sec = Math.floor(ctTime % 60);
                let ctMin = min.toString().padStart(2, "0");
                let ctSec = sec.toString().padStart(2, "0");
                playTime.innerText = `${ctMin}:${ctSec}`
            })

            timeBar.addEventListener("change", (event) => {
                event.stopPropagation(); 
                audioplayer.currentTime = parseInt(event.target.value)*tick
            });
        }

        audioplayer.onloadeddata = function(event){
            event.stopPropagation()
            timeAudio(); 
        }
    }

    function volumeChange(event) {
        event.stopPropagation(); 
        audioplayer.volume = parseInt(event.target.value)/100
        setVolume(parseInt(event.target.value)/100)
    }

    function endingFunction(event) {
        event.stopPropagation(); 
        setPlayPause('right-arrow')
        setIsPlaying(false)
    }
    
    function changeFunction(event) {
        event.stopPropagation(); 
    }
    return (
        <div id="player-box">
            <audio style={{display:'none'}} volume={volume} onEnded={() => endingFunction()} ref={audioRef} src={`/${music}`}></audio>
            <div id="img-box" className="mainbox">
                {music != ''
                ?<ImageWithFallback src={`/img/${music}.png`} fallback='/logo.png' />
                :<img src="/logo.png" />}
            </div>
            {music != ''
            ?<div id="controller-box" className="mainbox">
                <div id="playbar-box">
                    <input type="range" id="duration" className="rangeInput" name="duration" min="0" max="100" value="0" onChange={() => changeFunction()} />
                    <div id="duration-box">
                        <div id="playTime">00:00</div>
                        <div id="totTime">00:00</div>
                    </div>
                </div>
                <div id="playpause-box">
                    <div className="replay"><i className='bx bx-refresh' ></i></div>
                    <div className="playpause"><i className={`bx bxs-${playPause}`} ></i></div>
                    <div className="volume"><i className='bx bxs-volume-full ' ></i></div>
                    <div id="volume-box">
                        <input type="range" id="volume" className="rangeInput" min="0" max="100" value="100" onChange={() => volumeChange()} />
                    </div>
                </div>
            </div>
            :<div id="controller-box" className="mainbox inactive">
                <div id="playbar-box">
                    <input type="range" id="duration" className="rangeInput" name="duration" min="0" max="100" value="0" onChange={() => changeFunction()} />
                    <div id="duration-box">
                        <div id="playTime">00:00</div>
                        <div id="totTime">00:00</div>
                    </div>
                </div>
                <div id="playpause-box">
                    <div className="replay"><i className='bx bx-refresh' ></i></div>
                    <div className="playpause"><i className={`bx bxs-${playPause}`} ></i></div>
                    <div className="volume"><i className='bx bxs-volume-full ' ></i></div>
                    <div id="volume-box">
                        <input type="range" id="volume" className="rangeInput" min="0" max="100" value="100" onChange={() => volumeChange()} />
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
