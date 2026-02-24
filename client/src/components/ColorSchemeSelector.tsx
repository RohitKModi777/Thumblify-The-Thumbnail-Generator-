import { colorSchemes } from "../assets/assets";

const ColorSchemeSelector = ({ value, onChange }: { value: string; onChange: (color: string) => void }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold" style={{ color: "#d4d4d8" }}>Color Scheme</label>
      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((scheme) => {
          const selected = value === scheme.id;
          return (
            <button key={scheme.id} onClick={() => onChange(scheme.id)}
              className="relative rounded-xl transition-all"
              title={scheme.name}
              style={{
                outline: selected ? "2px solid #34d399" : "2px solid transparent",
                outlineOffset: "2px",
                boxShadow: selected ? "0 0 10px rgba(52,211,153,0.3)" : "none",
              }}>
              <div className="flex h-9 rounded-xl overflow-hidden">
                {scheme.colors.map((color, index) => (
                  <div key={index} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs" style={{ color: "#71717a" }}>
        Selected: <span style={{ color: "#34d399" }}>{colorSchemes.find(s => s.id === value)?.name || 'None'}</span>
      </p>
    </div>
  );
};

export default ColorSchemeSelector;
