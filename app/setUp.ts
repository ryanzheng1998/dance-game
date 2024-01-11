import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from '@mediapipe/tasks-vision'

export const setUp = async () => {
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

  const draw = (t: number) => {
    poseLandmarker.detectForVideo(webcam, t, (result) => {
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const landmark of result.landmarks) {
        drawingUtils.drawLandmarks(landmark, {
          radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
        })
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
      }

      ctx.restore()
    })

    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}
