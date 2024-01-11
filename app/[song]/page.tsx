import fs from 'fs/promises'
import { Ready } from './Ready'
import { Webcam } from './Webcam'
export default async function Home({ params }: { params: { song: string } }) {
  const decodedSong = decodeURIComponent(params.song)
  const poseDataRaw = await fs.readFile(
    `./public/pose-data/${decodedSong}.json`,
    'utf-8'
  )

  const poseData = JSON.parse(poseDataRaw) as {
    [key: string]: [number, number, number][]
  }
  return (
    <div>
      <Ready />
      <Webcam poseData={poseData} />
    </div>
  )
}
