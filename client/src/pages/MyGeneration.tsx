import { useEffect, useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import { Link, useNavigate } from "react-router-dom";
import { type IThumbnail } from "../assets/assets";
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../config/api";
import toast from "react-hot-toast";

const MyGeneration = () => {
  const { isLoggedIn } = useAuth()

  const navigate = useNavigate();
  const aspectRatioClassMap: Record<string, string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  }
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchThumbnails = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/api/user/thumbnails')
      setThumbnails(data.thumbnails || [])
    }
    catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
    }
    finally {
      setLoading(false)
    }
  }

  const handleDownload = (image_url: string) => {
    const link = document.createElement('a')
    link.href = image_url.replace('/upload', '/upload/fl_attachment')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete the Thumbnail?")
      if (!confirm) return
      const { data } = await api.delete(`/api/thumbnail/delete/${id}`)
      toast.success(data.message)
      setThumbnails(thumbnails.filter((t) => t._id !== id));

    }
    catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)

    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchThumbnails();
    }
  }, [isLoggedIn])

  return (
    <>
      <SoftBackdrop />
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-3xl font-extrabold"
            style={{
              background: "linear-gradient(135deg, #ffffff, #93c5fd, #d4d4d8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            My Generations
          </h1>
          <p className="text-sm mt-1" style={{ color: "#71717a" }}>
            View and manage all your AI-generated thumbnails
          </p>
          {/* Sapphire divider */}
          <div className="divider-silver mt-4 max-w-xs opacity-50" />
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl animate-pulse h-[260px]"
                style={{
                  background: "linear-gradient(160deg, #0c1120, #0e1628)",
                  border: "1px solid rgba(59,130,246,0.18)",
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              <span className="text-4xl">🖼️</span>
            </div>
            <h3 className="text-lg font-bold" style={{ color: "#d4d4d8" }}>No Thumbnails Yet</h3>
            <p className="text-sm mt-2" style={{ color: "#71717a" }}>Generate your first thumbnail to see it here.</p>
            <button
              onClick={() => navigate("/generate")}
              className="mt-6 px-8 py-2.5 rounded-full text-sm font-bold text-white transition-all active:scale-95 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa)",
                boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
              }}
            >
              ✦ Generate Now
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-6">
            {thumbnails.map((thumb: IThumbnail) => {
              const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];
              return (
                <div
                  key={thumb._id}
                  onClick={() => navigate(`/generate/${thumb._id}`)}
                  className="mb-6 group relative cursor-pointer rounded-2xl overflow-hidden break-inside-avoid transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(160deg, #0c1120, #0e1628)",
                    border: "1px solid rgba(59,130,246,0.18)",
                    boxShadow: "0 4px 24px -8px rgba(0,0,0,0.5)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.border = "1px solid rgba(96,165,250,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.border = "1px solid rgba(59,130,246,0.18)")}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${aspectClass}`} style={{ background: "#06050d" }}>
                    {thumb.image_url ? (
                      <img
                        src={thumb.image_url}
                        alt={thumb.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm" style={{ color: "#71717a" }}>
                        {thumb.isGenerating ? 'Generating...' : "No Image"}
                      </div>
                    )}
                    {thumb.isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium" style={{ background: "rgba(6,5,13,0.7)", color: "#60a5fa" }}>
                        Generating...
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="text-sm font-bold line-clamp-2" style={{ color: "#f4f4f5" }}>{thumb.title}</h3>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {[thumb.style, thumb.color_scheme, thumb.aspect_ratio].filter(Boolean).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.2)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: "#52525b" }}>
                      {new Date(thumb.createdAt!).toDateString()}
                    </p>

                    {/* Action buttons */}
                    <div onClick={(e) => e.stopPropagation()} className="absolute bottom-3 right-3 max-sm:flex sm:hidden group-hover:flex gap-1.5">
                      <button
                        onClick={() => handleDelete(thumb._id)}
                        className="size-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,50,50,0.3)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                      >
                        <TrashIcon className="size-3.5" style={{ color: "#60a5fa" }} />
                      </button>
                      <button
                        onClick={() => handleDownload(thumb.image_url!)}
                        className="size-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.25)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                      >
                        <DownloadIcon className="size-3.5" style={{ color: "#60a5fa" }} />
                      </button>
                      <Link to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}>
                        <span
                          className="size-7 rounded-lg flex items-center justify-center transition-all"
                          style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.25)")}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)")}
                        >
                          <ArrowUpRightIcon className="size-3.5" style={{ color: "#60a5fa" }} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  )
};

export default MyGeneration;

