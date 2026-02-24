import { SparkleIcon, SquareIcon, ImageIcon, CpuIcon, ChevronDownIcon } from "lucide-react";
import { thumbnailStyles, type ThumbnailStyle } from "../assets/assets";

const StyleSelector = ({ value, onChange, isOpen, setIsOpen }: {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const styleDescriptions: Record<ThumbnailStyle, string> = {
    'Bold & Graphic': "High contrast, bold typography, striking visuals",
    'Minimalist': "Clean, simple, lots of white space",
    'Photorealistic': "Photo-based, natural looking",
    'Illustrated': "Hand-drawn, artistic, creative",
    'Tech/Futuristic': "Modern, sleek, tech-inspired"
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    'Bold & Graphic': <SparkleIcon className="size-4" />,
    'Minimalist': <SquareIcon className="size-4" />,
    'Photorealistic': <ImageIcon className="size-4" />,
    'Illustrated': <ImageIcon className="size-4" />,
    'Tech/Futuristic': <CpuIcon className="size-4" />
  };

  return (
    <div className="relative space-y-3">
      <label className="block text-sm font-semibold" style={{ color: "#d4d4d8" }}>Thumbnail Style</label>

      <button type="button" onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all"
        style={{
          background: "rgba(6,20,14,0.8)",
          border: `1px solid ${isOpen ? "rgba(52,211,153,0.45)" : "rgba(16,185,129,0.22)"}`,
          color: "#f4f4f5",
        }}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: "#34d399" }}>
            {styleIcons[value]}<span>{value}</span>
          </div>
          <p className="text-xs" style={{ color: "#71717a" }}>{styleDescriptions[value]}</p>
        </div>
        <ChevronDownIcon className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "#71717a" }} />
      </button>

      {isOpen && (
        <div className="absolute bottom-0 z-50 w-full rounded-xl overflow-hidden shadow-2xl"
          style={{ background: "#0b1a14", border: "1px solid rgba(16,185,129,0.25)", backdropFilter: "blur(20px)" }}>
          {thumbnailStyles.map((s) => (
            <button key={s} onClick={() => { onChange(s); setIsOpen(false); }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-all"
              style={{ borderBottom: "1px solid rgba(16,185,129,0.08)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(16,185,129,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <div style={{ color: s === value ? "#34d399" : "#71717a" }}>{styleIcons[s]}</div>
              <div>
                <p className="text-sm font-medium" style={{ color: s === value ? "#34d399" : "#d4d4d8" }}>{s}</p>
                <p className="text-xs" style={{ color: "#71717a" }}>{styleDescriptions[s]}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
