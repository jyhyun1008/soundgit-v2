'use client'
import { useState, useRef, useEffect } from "react";
import List from "./List";
import PlayerBox from "./PlayerBox";
import About from "./About";
import PageViewer from "./PageViewer";

export default function Player(props) {
    
    const musicList = props.audio
    const nowPlayingRef = useRef('')
    const [nowPlay, setNowPlay] = useState('')

    const [page, setPage] = useState('index')

    useEffect(()=>{

        function addMouseEvent() {
            setTimeout(() => {  
                console.log(nowPlayingRef.current.innerText)
                setNowPlay(nowPlayingRef.current.innerText)
            }, 100);
        }

        function changePage(page) {
            setPage(page)
        }

        document.querySelector('#title').addEventListener('click', ()=>{changePage('index')})
        document.querySelector('#about').addEventListener('click', ()=>{changePage('about')})

        document.querySelectorAll('.play-play-box').forEach(element => {
            element.addEventListener('click', addMouseEvent)
        })

        document.querySelectorAll('.play-link-box').forEach(element => {
            element.addEventListener('click', ()=>{
                changePage(element.id)
                setNowPlay(element.id)
            })
        })
        // 클린업 함수
        return () => {
            document.querySelector('#title').removeEventListener('click', ()=>{changePage('index')})
            document.querySelector('#about').removeEventListener('click', ()=>{changePage('about')})

            document.querySelectorAll('.play-play-box').forEach(element => {
                element.removeEventListener('click', addMouseEvent)
            })

            document.querySelectorAll('.play-link-box').forEach(element => {
                element.removeEventListener('click', ()=>{changePage(element.id)})
            })
        }
        
    })

    if (!props.audio) {
        return (
        <>
            <div id="content-box">
                <PlayerBox nowPlay={nowPlay} />
                <List list={musicList} />
            </div>
        </>
        )
    } else if (!Array.isArray(props.audio)) {
        
    }

    return (
        <div id="wrapper">
            <div id="nav-box">
                <div id="title-box">
                    <h1 id="title">Sound-Git</h1>
                </div>
                <div id="menu-box">
                    <p id="about">About</p>
                </div>
            </div>
            <div id="content-box">
                <PlayerBox nowPlay={nowPlay} />
                {page == 'index'
                ?<List list={musicList} nowPlaying={nowPlayingRef} />
                :page == 'about'
                    ?<About />
                    :<PageViewer music={page} />}
            </div>
        </div>
    );
}
