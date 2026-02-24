
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import type { AspectRatio, IThumbnail } from "../assets/assets";

const PreviewPanel = ({ thumbnail, isLoading, aspectRatio }: { thumbnail: IThumbnail | null; isLoading: boolean; aspectRatio: AspectRatio }) => {

  const aspectClasses = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  } as Record<AspectRatio, string>;

  const onDownload = () => {
    if (!thumbnail?.image_url) return
    const link = document.createElement('a')
    link.href = thumbnail?.image_url.replace('/upload', '/upload/fl_attachment')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`relative overflow-hidden rounded-xl ${aspectClasses[aspectRatio]}`}
        style={{ border: "1px solid rgba(200,158,40,0.12)" }}>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ background: "rgba(6,5,13,0.8)" }}>
            <div className="size-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(200,158,40,0.1)", border: "1px solid rgba(200,158,40,0.2)" }}>
              <Loader2Icon className="size-7 animate-spin" style={{ color: "#f5c842" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "#d4d4d8" }}>AI is creating your thumbnail...</p>
              <p className="mt-1 text-xs" style={{ color: "#71717a" }}>This may take 10–20 seconds</p>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img src={thumbnail.image_url} alt={thumbnail.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-end justify-center opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: "linear-gradient(to top, rgba(6,5,13,0.8) 0%, transparent 60%)" }}>
              <button
                type="button"
                className="mb-6 flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all active:scale-95 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #f5c842, #e6a817)",
                  color: "#0f0b00",
                  boxShadow: "0 4px 16px rgba(200,158,40,0.4)",
                }}
                onClick={onDownload}
              >
                <DownloadIcon className="size-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed"
            style={{ borderColor: "rgba(200,158,40,0.15)", background: "rgba(15,12,31,0.5)" }}>
            <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full"
              style={{ background: "rgba(200,158,40,0.08)", border: "1px solid rgba(200,158,40,0.15)" }}>
              <ImageIcon className="size-10 opacity-40" style={{ color: "#f5c842" }} />
            </div>
            <div className="px-4 text-center">
              <p className="font-semibold" style={{ color: "#d4d4d8" }}>Generate your First Thumbnail</p>
              <p className="mt-1 text-xs" style={{ color: "#71717a" }}>Fill out the form and click Generate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default PreviewPanel;
