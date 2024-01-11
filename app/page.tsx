import fs from 'fs/promises'
import { FrontPage } from './FrontPage'
import { Ready } from './Ready'
import { Webcam } from './Webcam'
export default async function Home() {
  const songs = await fs.readdir('./public/videos')

  return (
    <div>
      <FrontPage songs={songs} />
      <Ready />
      <Webcam />
    </div>
  )
}
