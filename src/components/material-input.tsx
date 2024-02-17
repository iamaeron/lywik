import { component$ } from "@builder.io/qwik";

export const MInput = component$(() => {
  return (
    <div class="relative">
      <input
        type="text"
        id="song_name"
        name="song_name"
        placeholder=" "
        class="peer block w-full rounded-md border border-transparent border-zinc-300 px-4 pb-2 pt-3 text-sm font-semibold text-zinc-600 outline-none -outline-offset-2 transition-all focus:text-zinc-800 focus:outline-2 focus:outline-indigo-500"
      />
      <label
        for="song_name"
        class="pointer-events-none absolute left-3 top-1/2 block -translate-y-7 bg-white px-1 text-xs font-medium text-zinc-500 transition-all peer-placeholder-shown:-translate-y-2.5 peer-placeholder-shown:text-sm peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-indigo-500"
      >
        Song name
      </label>
    </div>
  );
});
