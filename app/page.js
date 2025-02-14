import Image from "next/image";
import styles from "./page.module.css";
import Controller from "@/components/Controller"

export async function generateMetadata() {
 
  return {
    title: `SoundGit - ${process.env.ARTIST}`,
    description: `Welcome to ${process.env.ARTIST}'s sound world!`,
    openGraph: {
      images: ['/logo.png'],
    },
  }
}

let musicList = []

export default async function Home() {

  var result1 = await fetch('http://localhost:3000/api/getFile')
  var folderList = await result1.json()
  musicList = folderList.files
  
  return (
    <div id="app">
      <div id="wrapper">
          <div id="nav-box">
              <div id="title-box">
                  <h1 id="title"><a href="/">Sound-Git</a></h1>
              </div>
              <div id="menu-box">
                  <a href="/about">About</a>
              </div>
          </div>
          <Controller audio={musicList} />
      </div>
  </div>
  );
}
