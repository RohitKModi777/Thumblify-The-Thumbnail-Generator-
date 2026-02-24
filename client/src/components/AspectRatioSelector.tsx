import { RectangleHorizontal, Square, RectangleVertical } from "lucide-react";
import { aspectRatios, type AspectRatio } from "../assets/assets";

const AspectRatioSelector = ({ value, onChange }: { value: AspectRatio; onChange: (ratio: AspectRatio) => void }) => {
    const iconMap = {
        '16:9': <RectangleHorizontal className="size-5" />,
        '1:1': <Square className="size-5" />,
        '9:16': <RectangleVertical className="size-5" />
    } as Record<AspectRatio, React.ReactNode>;

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold" style={{ color: "#d4d4d8" }}>Aspect Ratio</label>
            <div className="flex flex-wrap gap-2">
                {aspectRatios.map((ratio) => {
                    const selected = value === ratio;
                    return (
                        <button
                            key={ratio}
                            type="button"
                            onClick={() => onChange(ratio)}
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
                            style={{
                                background: selected
                                    ? "rgba(16,185,129,0.18)"
                                    : "rgba(6,20,14,0.6)",
                                border: selected
                                    ? "1px solid rgba(52,211,153,0.55)"
                                    : "1px solid rgba(16,185,129,0.18)",
                                color: selected ? "#34d399" : "#a1a1aa",
                            }}
                        >
                            {iconMap[ratio]}
                            <span>{ratio}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AspectRatioSelector;
