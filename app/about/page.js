import About from "@/components/About"
import PlayerBox from "@/components/PlayerBox";

export async function generateMetadata() {
 
  return {
    title: `SoundGit - ${process.env.NEXT_PUBLIC_ARTIST}`,
    description: `Welcome to ${process.env.NEXT_PUBLIC_ARTIST}'s sound world!`,
    openGraph: {
      images: ['/logo.png'],
    },
  }
}

export default async function Home() {

  return (
    <div id="app">
        <div id="wrapper">
            <div id="nav-box">
                <div id="title-box">
                    <h1 id="title"><a href="/">Sound-Git</a></h1>
                </div>
                <div id="menu-box">
                    <p id="about"><a href="/about">About</a></p>
                </div>
            </div>
            <div id="content-box">
                <PlayerBox />
                <About />
            </div>
        </div>
    </div>
  );
}
