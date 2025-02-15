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

let musicList = []

export default async function Home() {

  var result1 = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_GITHUB}/${process.env.NEXT_PUBLIC_REPO}/git/trees/main?recursive=1`)
  var folderList = await result1.json()
  
  for (let folder of folderList.tree) {
      if (folder.path == 'public') {
          var result2 = await fetch(folder.url)
          var audioList = await result2.json()

          for (let audio of audioList.tree) {
              if (audio.path.includes('.mp3')) {
                  //musicList.push(`https://github.com/${USERNAME}/${REPONAME}/raw/refs/heads/main/mp3/${audio.path}`)
                  musicList.push(`${audio.path.split('.')[0]}`)
              }
          }
      }
  }
  return (
    <div id="app">
        <Player audio={musicList} />
    </div>
  );
}
