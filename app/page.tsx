import fs from 'fs/promises'
export default async function Home() {
  const songsRaw = await fs.readdir('./public/videos')
  const songs = songsRaw.map((s) => s.split('.')[0])

  return (
    <div className="grid h-screen w-screen place-items-center bg-gradient-to-b from-slate-500 to-slate-800">
      <div className="grid place-items-center gap-4">
        {songs.map((s) => {
          return (
            <a
              href={`/${s}`}
              className="text-3xl text-white shadow-2xl"
              key={s}
            >
              {s}
            </a>
          )
        })}
      </div>
    </div>
  )
}
