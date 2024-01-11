import { comparePoses } from '@/function/comparePose'
import {
  DrawingUtils,
  FilesetResolver,
  NormalizedLandmark,
  PoseLandmarker,
} from '@mediapipe/tasks-vision'

export const setUp = async (song: string, startTime: number) => {
  // setup webcam
  const webcam = document.getElementById('webcam') as HTMLVideoElement
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  })
  webcam.srcObject = stream

  // setup canvas
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!

  // setup drawing utils
  const drawingUtils = new DrawingUtils(ctx)
  canvas.width = 1080
  canvas.height = 720

  // setup pose detection
  const vision = await FilesetResolver.forVisionTasks('/wasm')
  const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `/pose_landmarker_lite.task`,
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numPoses: 2,
  })

  // get pose data
  const dataRaw = await fetch(`/pose-data/${song}.json`)
  const dataRaw2 = (await dataRaw.json()) as {
    [key: string]: [number, number, number][]
  }
  const data = Object.keys(dataRaw2)
    .map((key) => ({ frameCount: Number(key), poseData: dataRaw2[key]! }))
    .sort((a, b) => a.frameCount - b.frameCount)

  // state for calculating score
  let allLandmarks: { time: number; landmarks: NormalizedLandmark[][] }[] = []
  let dataIndex = 0

  const draw = (t: number) => {
    poseLandmarker.detectForVideo(webcam, t, (result) => {
      // setup pose drawing
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const landmark of result.landmarks) {
        drawingUtils.drawLandmarks(landmark, {
          radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
        })
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
      }

      ctx.restore()

      const currentData = data[dataIndex]
      const time = (t - startTime) / 1000
      if (currentData === undefined) return

      const currentDataTime = currentData.frameCount / 30

      // mess with state
      allLandmarks.push({ time, landmarks: result.landmarks })

      // calculate score
      if (time > currentDataTime) {
        dataIndex++

        const allLandmarksInBetween = allLandmarks.filter(
          (landmark) =>
            landmark.time >= currentDataTime - 0.5 &&
            landmark.time <= currentDataTime + 0.5
        )

        const allSimilarities = allLandmarksInBetween.map((landmark) => {
          const similarity = comparePoses(
            currentData.poseData,
            landmark.landmarks?.[0]?.map((l) => [l.x, l.y, l.z]) ?? []
          )
          return similarity
        })

        const maxSimilarity = Math.max(...allSimilarities)

        console.log(maxSimilarity)
        console.log(allLandmarks)
      }
    })

    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}
