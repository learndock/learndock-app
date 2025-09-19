import React, { useEffect, useState } from "react";

interface NumberDropdownProps {
  initial?: number;
  onChange?: (value: number) => void;
  display?: boolean;
  range?: [number, number]; // [min, max]
  lowGood?: boolean;
}

const stops = ["#00ff00", "#ffc107", "#dc3545"]; // green, orange, red

const hexToRgb = (hex: string) =>
  hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpColor = (a: string, b: string, t: number) => {
  const ar = hexToRgb(a);
  const br = hexToRgb(b);
  const rgb = ar.map((v, i) => Math.round(lerp(v, br[i], t)));
  return `rgb(${rgb.join(",")})`;
};

const getColor = (num: number, [min, max]: [number, number], lowGood: boolean) => {
  if (num <= min) return "#808080"; // gray
  if (num > max) return lowGood ? "#5a0000" : "#003300"; // out of range dark

  const mid = (min + max) / 2;
  const palette = lowGood ? stops : [...stops].reverse();

  if (num <= mid) {
    const t = (num - min) / (mid - min);
    return lerpColor(palette[0], palette[1], t);
  } else {
    const t = (num - mid) / (max - mid);
    return lerpColor(palette[1], palette[2], t);
  }
};

const NumberDropdown: React.FC<NumberDropdownProps> = ({
  initial,
  onChange,
  display = false,
  range = [0, 3],
  lowGood = true,
}) => {
  const [selected, setSelected] = useState(initial ?? range[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (num: number) => {
    setSelected(num);
    setOpen(false);
    onChange?.(num);
  };

  useEffect(() => {
    if (initial !== undefined) {
      setSelected(initial);
    }
  }, [initial]);


  const [min, max] = range;

  return (
    <div className="relative inline-block text-center">
      {/* Selected number */}
      <div
        className={`${!display && "cursor-pointer"} px-3 py-1 rounded shadow`}
        style={{ backgroundColor: getColor(selected, range, lowGood), color: "#fff" }}
        onClick={() => setOpen(!open)}
      >
        {selected === 0 ? "-" : selected}
      </div>

      {/* Dropdown */}
      {!display && open && (
        <div className="absolute mt-1 w-full rounded shadow-lg overflow-hidden z-50">
          {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
            <div
              key={num}
              className={`cursor-pointer px-3 py-1 transition-all duration-200 ${num === selected ? "font-bold" : ""
                }`}
              style={{ backgroundColor: getColor(num, range, lowGood), color: "#fff" }}
              onClick={() => handleSelect(num)}
            >
              {num === 0 ? "-" : num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NumberDropdown;
