'use client'
import ImageWithFallback from "./ImageWithFallback";
import { useState, useRef, useEffect } from "react";

export default function PlayerBox(props) {
    
    const music = props.nowPlay
    const audioRef = useRef('')

    const defaultImgSrc = '/logo.png'

    var playList = [] //json
    var sPlayList = []
    var isShuffle = false
    var isPlaying = false
    var isLoop = true
    const [percentPlayTime, setPlayTime] = useState(0)
    const [volume, setVolume] = useState(100);
    var currentPlaying = {}
    const [isFirstPlay, setFP] = useState(true)
    const [tick, setTick] = useState(1)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [totMin, setTotMin] = useState(min.toString().padStart(2, "0"))
    const [totSec, setTotSec] = useState(sec.toString().padStart(2, "0"))

    //console.log(audioRef.current.duration)
    // if (audioRef.current.duration > 0) {
    //     setTick(audioRef.current.duration / 100)
    //     setMin(Math.floor(audioRef.current.duration / 60))
    //     setSec(Math.floor(audioRef.current.duration % 60))
    //     setTotMin(min.toString().padStart(2, "0"))
    //     setTotSec(sec.toString().padStart(2, "0"))
    // }

    useEffect(()=>{

        var audioplayer = document.querySelector("audio")
        var audio = audioRef.current
        const playBarContoller = function () {
            const timeAudio = () => {

                //
                const timeBar = document.querySelector('#duration')
                const totTime = document.querySelector('#totTime')
                // const playTime = document.querySelector('#playTime')
                // setTick(duration / 100)
                //전체시간 표시
                // 음원 총 재생시간 구하기
                totTime.innerText = `${totMin}:${totSec}`
        
                // 현재시간 표시
                audioplayer.addEventListener("timeupdate", (event) => {
                    //const playTime = $(".current");
                    let ctTime = parseInt(audioRef.current.currentTime)
                    // 프로그레스 바 업데이트
                    timeBar.value = `${ctTime / tick}`
                    let ctmin = Math.floor(ctTime / 60);
                    let ctsec = Math.floor(ctTime % 60);
                    let ctMin = ctmin.toString().padStart(2, "0");
                    let ctSec = ctsec.toString().padStart(2, "0");
                    playTime.innerText = `${ctMin}:${ctSec}`
                })
        
                // timeBar.addEventListener("change", (event) => {
                //     audioplayer.currentTime = parseInt(percentPlayTime)*tick
                // });
            }

        const handleMetadata = () => {
            const duration = audio.duration
            setPlayTime(0)
            setTick(duration / 100)
            setMin(Math.floor(duration / 60));
            setSec(Math.floor(duration % 60));
            setTotMin(Math.floor(duration / 60).toString().padStart(2, "0"));
            setTotSec(Math.floor(duration % 60).toString().padStart(2, "0"));
        };

        audio.addEventListener("loadedmetadata", handleMetadata);
        
            // audioplayer.onloadeddata = function(){
            //     timeAudio(); 
            // }
        }
        
        const playerController = function () {
            document.querySelector(".playpause").addEventListener("click", function () {
                if (isPlaying) {
                    audioplayer.pause()
                    document.querySelector(".playpause").innerHTML = "<i class='bx bxs-right-arrow ' ></i>"
                    isPlaying = false
                } else {
                    audioplayer.play()
                    document.querySelector(".playpause").innerHTML = "<i class='bx bxs-square' ></i>"
                    isPlaying = true
                }
            })
        
            document.querySelector('body').addEventListener("keydown", (event) => {
                if (event.key == ' ' || event.key == 'Spacebar' || event.keyCode == 32) {
                    if (isPlaying) {
                        audioplayer.pause()
                        document.querySelector(".playpause").innerHTML = "<i class='bx bxs-right-arrow' ></i>"
                        isPlaying = false
                    } else {
                        audioplayer.play()
                        document.querySelector(".playpause").innerHTML = "<i class='bx bxs-square' ></i>"
                        isPlaying = true
                    }
                }
            });
        
            document.querySelector(".replay").addEventListener("click", function () {
                if (isLoop) {
                    isLoop = false
                    audioplayer.loop = isLoop
                    document.querySelector(".replay").innerHTML = "<i class='bx bx-refresh' style='color: #00000055;' ></i>"
                } else {
                    isLoop = true
                    audioplayer.loop = isLoop
                    document.querySelector(".replay").innerHTML = "<i class='bx bx-refresh' style='color: black;' ></i>"
                }
            })
        
            document.querySelector(".volume").addEventListener("click", (event) => {
                if (document.getElementById("volume-box").style.display == 'none') {
                    document.getElementById("volume-box").style.display = 'flex'
                } else {
                    document.getElementById("volume-box").style.display = 'none'
                }
            });
        
            // document.querySelector("#volume").addEventListener("change", (event) => {
            //     audioplayer.volume = volume/100
            // });
        
            document.querySelector('audio').addEventListener("ended", ()=> {
                document.querySelector(".playpause").innerHTML = "<i class='bx bxs-right-arrow ' ></i>"
                isPlaying = false
            })
        }

            if (isFirstPlay && music != '') {
                console.log('load func')
                playBarContoller()
                playerController()
                setFP(false)
            } else {
                console.log(isFirstPlay, music)
            }
    }, [music, isFirstPlay, audioRef.current, tick])
    
    return (
        <div id="player-box">
            {music != ''
            ? <audio style={{display:'none'}} volume={volume/100} ref={audioRef} src={`/${music}.mp3`}></audio>
            : <></>}
            <div id="img-box" className="mainbox">
                {music != ''
                ?<ImageWithFallback src={`/img/${music}.png`} fallback='/logo.png' />
                :<img src="/logo.png" />}
            </div>
            {music != ''
            ?<div id="controller-box" className="mainbox">
                <div id="playbar-box">
                    <input type="range" id="duration" className="rangeInput" name="duration" min="0" max="100" value={percentPlayTime} onChange={(e)=>{setPlayTime(parseInt(e.target.value)); audioRef.current.currentTime=parseInt(e.target.value)*tick}} />
                    <div id="duration-box">
                        <div id="playTime">00:00</div>
                        <div id="totTime">{totMin}:{totSec}</div>
                    </div>
                </div>
                <div id="playpause-box">
                    <div className="replay"><i className='bx bx-refresh' ></i></div>
                    <div className="playpause"><i className='bx bxs-right-arrow' ></i></div>
                    <div className="volume"><i className='bx bxs-volume-full ' ></i></div>
                    <div id="volume-box">
                        <input type="range" id="volume" className="rangeInput" min="0" max="100" value={volume} onChange={(e)=>{setVolume(Number(e.target.value)); audioRef.current.volume=Number(e.target.value)/100}} />
                    </div>
                </div>
            </div>
            :<div id="controller-box" className="mainbox inactive">
                <div id="playbar-box">
                    <input type="range" id="duration" className="rangeInput" name="duration" min="0" max="100" value={percentPlayTime} onChange={(e)=>{setPlayTime(parseInt(e.target.value)); audioRef.current.currentTime=parseInt(e.target.value)*tick}} />
                    <div id="duration-box">
                        <div id="playTime">00:00</div>
                        <div id="totTime">{totMin}:{totSec}</div>
                    </div>
                </div>
                <div id="playpause-box">
                    <div className="replay"><i className='bx bx-refresh' ></i></div>
                    <div className="playpause"><i className='bx bxs-right-arrow' ></i></div>
                    <div className="volume"><i className='bx bxs-volume-full ' ></i></div>
                    <div id="volume-box">
                        <input type="range" id="volume" className="rangeInput" min="0" max="100" value={volume} onChange={(e)=>{setVolume(Number(e.target.value)); audioRef.current.volume=Number(e.target.value)/100}} />
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
