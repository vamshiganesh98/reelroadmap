import type { WatchContent } from '../types/content'

interface Props {
  watch: WatchContent
}

export default function WatchStep({ watch }: Props) {
  const start = watch.startSeconds ?? 0
  const src = watch.endSeconds
    ? `https://www.youtube.com/embed/${watch.videoId}?start=${start}&end=${watch.endSeconds}`
    : `https://www.youtube.com/embed/${watch.videoId}?start=${start}`

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
        <p className="font-medium text-white">{watch.title}</p>
        <p className="text-sm text-slate-400">{watch.channel}</p>
        <p className="mt-2 text-sm text-slate-300">{watch.why}</p>
      </div>
      <div className="aspect-video overflow-hidden rounded-xl border border-slate-700">
        <iframe
          title={watch.title}
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-xs text-slate-500">Watch the video, then mark complete when ready to practice.</p>
    </div>
  )
}
