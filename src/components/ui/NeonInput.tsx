"use client";

export default function NeonInput({ value, onChange }: any) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Indovina la canzone..."
      className="
        w-full px-4 py-3
        bg-black/40 backdrop-blur
        border border-cyan-400
        text-white rounded-md
        shadow-[0_0_8px_#00eaff]
        outline-none
      "
      autoComplete="off"
    />
  );
}
