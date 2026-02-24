import { colorSchemes, type AspectRatio, type IThumbnail, type ThumbnailStyle } from "../assets/assets";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";




const Generate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  // GENERATE 
  const handleGenerate = async () => {
    try {
      if (!isLoggedIn)
        return toast.error("Please login first to generate thumbnails");

      if (!title.trim())
        return toast.error("Title is required");
      setLoading(true);

      const api_payload = {
        title,
        prompt: additionalDetails,
        style,
        aspect_ratio: aspectRatio,
        color_scheme: colorSchemeId,
        text_overlay: true,
      };

      const { data } = await api.post("/api/thumbnail/generate", api_payload);

      if (data?.thumbnail) {
        // Keep loading=true so PreviewPanel shows spinner while we navigate
        // and fetchThumbnail runs. It will be set to false inside fetchThumbnail.
        navigate("/generate/" + data.thumbnail._id);
        toast.success(data.message);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  //FETCH THUMBNAIL
  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/thumbnail/${id}`);
      setThumbnail(data?.thumbnail as IThumbnail)
      setLoading(!data?.thumbnail?.image_url);
      setAdditionalDetails(data?.thumbnail?.user_prompt)
      setTitle(data?.thumbnail?.title);
      setColorSchemeId(data?.thumbnail?.color_scheme);
      setAspectRatio(data?.thumbnail?.aspect_ratio)
      setStyle(data?.thumbnail?.style)

    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // INITIAL FETCH: runs when id changes or user logs in
  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail();
    }
    if (!id) {
      setThumbnail(null);
      setLoading(false);
    }
  }, [id, isLoggedIn]);

  // POLLING: when thumbnail exists but image_url is not ready yet
  useEffect(() => {
    if (id && loading && isLoggedIn && thumbnail && !thumbnail.image_url) {
      const interval = setInterval(() => {
        fetchThumbnail();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, loading, isLoggedIn, thumbnail]);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">

            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id ? "pointer-events-none opacity-60" : ""}`}>
              <div
                className="p-6 rounded-2xl shadow-2xl space-y-6 card-shimmer"
                style={{
                  background: "linear-gradient(160deg, #0b1a14 0%, #0f1e19 100%)",
                  border: "1px solid rgba(16,185,129,0.22)",
                }}
              >
                <div>
                  <h2
                    className="text-2xl font-extrabold mb-1"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #34d399, #d4d4d8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Create Your Thumbnail
                  </h2>
                  <p style={{ color: "#71717a", fontSize: "13px" }}>Describe your vision and let AI bring it to life</p>
                </div>

                <div className="space-y-5">
                  {/* TITLE INPUT */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{ color: "#d4d4d8" }}>
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="e.g., 10 Tips for Better Sleep"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(6,20,14,0.8)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        color: "#f4f4f5",
                      }}
                      onFocus={e => (e.target.style.border = "1px solid rgba(52,211,153,0.5)")}
                      onBlur={e => (e.target.style.border = "1px solid rgba(16,185,129,0.2)")}
                    />
                    <div className="flex justify-end">
                      <span className="text-xs" style={{ color: "#52525b" }}>{title.length}/100</span>
                    </div>
                  </div>

                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                  {/* ADDITIONAL DETAILS */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{ color: "#d4d4d8" }}>
                      Additional Prompts{" "}
                      <span style={{ color: "#52525b", fontSize: "11px" }}>(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                      placeholder="Add any specific elements, mood, or style preferences..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                      style={{
                        background: "rgba(6,20,14,0.8)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        color: "#f4f4f5",
                      }}
                      onFocus={e => (e.target.style.border = "1px solid rgba(52,211,153,0.5)")}
                      onBlur={e => (e.target.style.border = "1px solid rgba(16,185,129,0.2)")}
                    />
                  </div>
                </div>

                {/* GENERATE BUTTON */}
                {!id && (
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: loading
                        ? "rgba(16,185,129,0.2)"
                        : "linear-gradient(135deg, #059669, #10b981, #34d399)",
                      color: "#fff",
                      boxShadow: loading ? "none" : "0 4px 20px rgba(16,185,129,0.35)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="size-4 border-2 border-emerald-900 border-t-emerald-400 rounded-full animate-spin" />
                        Generating...
                      </span>
                    ) : "✦ Generate Thumbnail"}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div>
              <div
                className="p-6 rounded-2xl shadow-2xl"
                style={{
                  background: "linear-gradient(160deg, #0f0c1f 0%, #130e24 100%)",
                  border: "1px solid rgba(200,158,40,0.15)",
                }}
              >
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ color: "#f5c842" }}
                >
                  Preview
                </h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;