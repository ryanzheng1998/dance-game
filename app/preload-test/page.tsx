'use client'

export default function Home() {
  return (
    <div>
      <video
        onCanPlayThrough={() => {
          console.log('can play through')
        }}
        src="/videos/Let It Go - 魔王.mov"
      />
      <button
        onClick={() => {
          const video = document.querySelector('video')!
          video.play()
        }}
      >
        play
      </button>
    </div>
  )
}
