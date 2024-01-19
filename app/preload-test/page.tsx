'use client'

export default function Home() {
  return (
    <div>
      <link href="/videos/Let It Go - 魔王.mov" rel="prefetch" as="video" />
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
