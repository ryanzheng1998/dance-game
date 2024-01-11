import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from '@mediapipe/tasks-vision'

export const startPlay = async () => {
  // setup webcam
  const webcam = document.getElementById('webcam') as HTMLVideoElement
  const video = document.getElementById('video') as HTMLVideoElement
  video.play()
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
}
