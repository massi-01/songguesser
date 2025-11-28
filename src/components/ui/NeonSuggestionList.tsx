"use client";

export default function NeonSuggestionList({ suggestions, onSelect }: any) {
  if (!suggestions.length) return null;

  return (
    <ul
      className="
        absolute w-full mt-2 rounded-md overflow-hidden z-50
        bg-black/60 backdrop-blur
        border border-cyan-400
        shadow-[0_0_10px_#00eaff]
        animate-neon-pop
      "
    >
      {suggestions.map((s: any) => (
        <li
          key={s.id}
          onClick={() => onSelect(s)}
          className="
            px-4 py-2 cursor-pointer
            hover:bg-cyan-400/20
            transition
          "
        >
          {s.name}
        </li>
      ))}
    </ul>
  );
}
