import Player from "@/components/Player"

export async function generateMetadata() {
 
  return {
    title: `SoundGit - ${process.env.NEXT_PUBLIC_ARTIST}`,
    description: `Welcome to ${process.env.NEXT_PUBLIC_ARTIST}'s sound world!`,
    openGraph: {
      images: ['/logo.png'],
    },
  }
}

let musicList = process.env.NEXT_PUBLIC_SONGLIST

export default function Home() {

  return (
    <div id="app">
        <Player audio={musicList} />
    </div>
  );
}
