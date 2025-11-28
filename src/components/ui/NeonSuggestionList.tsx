"use client";

export default function NeonSuggestionList({
  suggestions,
  onSelect,
}: {
  suggestions: any[];
  onSelect: (s: any) => void;
}) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div
        className="
    absolute w-full mt-2 z-20
    max-h-64 overflow-y-auto neon-scroll
    bg-gray-900 border border-cyan-400 
    rounded-xl shadow-[0_0_10px_#00eaff] 
    select-none
  "
    >
      {suggestions.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelect(s)}
          className="
            px-4 py-2 
            text-white 
            cursor-pointer
            hover:bg-cyan-400/20
          "
        >
          {s.name}
        </div>
      ))}
    </div>
  );
}
