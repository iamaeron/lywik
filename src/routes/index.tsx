import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
  useNavigate,
} from "@builder.io/qwik-city";

export const useSearchTrack = routeAction$(
  async ({ songName }) => {
    const res = await fetch(`https://lyrist.vercel.app/api/${songName}`);
    const data = await res.json();

    return data;
  },
  zod$({
    songName: z.string(),
  }),
);

export default component$(() => {
  const nav = useNavigate();
  const searchTrack = useSearchTrack();

  return (
    <main class="flex min-h-screen flex-col  justify-between bg-zinc-900 font-['Plus_Jakarta_Sans']">
      <div class="flex flex-col items-center px-4 py-10 text-zinc-300">
        <div class="my-6 flex w-40 flex-col justify-center space-y-1.5 rounded-xl p-3 shadow-[0_0_40px_0,0_0_0_1px,0_1px_0_0] shadow-zinc-700/20">
          <div class="h-2 w-full rounded-full bg-zinc-800"></div>
          <div class="h-2 w-1/2 rounded-full bg-zinc-700"></div>
          <div class="h-2 w-1/5 rounded-full bg-zinc-800"></div>
          <div class="h-2 w-2/3 rounded-full bg-gradient-to-r from-sky-400 to-violet-400"></div>
          <div class="h-2 w-3/4 rounded-full bg-zinc-800"></div>
          <div class="h-2 w-1/3 rounded-full bg-zinc-700"></div>
          <div class="h-2 w-full rounded-full bg-zinc-800"></div>
        </div>
        <h1 class="mb-2 bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
          Lywik
        </h1>
        <p>Search lyrics for your favorite song!</p>
        <div class="mt-10 w-full max-w-xl">
          <div class="space-y-2">
            <Form
              onSubmitCompleted$={() => {
                nav("#lyrics");
              }}
              action={searchTrack}
              class="rounded-xl border border-zinc-800 p-4 text-sm"
            >
              <p class="mb-4">Search</p>
              <input
                placeholder="Song name"
                required
                type="text"
                id="songName"
                name="songName"
                class="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium outline-none outline-2 placeholder:text-zinc-500 focus:outline-sky-400"
              />
              <button class="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm font-medium hover:border-zinc-600">
                Search
              </button>
            </Form>

            <div id="lyrics" class="pt-6">
              <div class="rounded-xl border border-zinc-800 px-2 py-4 text-sm">
                <div class="relative max-h-[40rem] overflow-y-auto px-2">
                  {searchTrack.isRunning ? (
                    <div class="relative flex items-center space-x-2 overflow-hidden pb-14">
                      <div class="shimmer absolute -bottom-full -top-full w-12 rotate-45 bg-zinc-900 blur-xl"></div>
                      <div class="h-[35px] w-[35px] rounded-lg bg-zinc-800"></div>
                      <div>
                        <div class="mb-1 h-3 w-14 rounded-full bg-zinc-700"></div>
                        <div class="h-3 w-8 rounded-full bg-zinc-800"></div>
                      </div>
                    </div>
                  ) : searchTrack.value &&
                    Object.keys(searchTrack.value).length ? (
                    <div class="sticky top-0 flex items-center space-x-2 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-900/0 pb-14">
                      <img
                        src={searchTrack.value.image}
                        alt=""
                        width={35}
                        height={35}
                        style={{ height: 35, width: 35 }}
                        class="rounded-lg object-cover"
                      />
                      <div>
                        <p class="font-semibold">{searchTrack.value.title}</p>
                        <p>{searchTrack.value.artist}</p>
                      </div>
                    </div>
                  ) : null}
                  <p
                    class={[
                      searchTrack.value || searchTrack.isRunning
                        ? "-mt-6"
                        : null,
                    ]}
                  >
                    Lyrics
                  </p>
                  {searchTrack.isRunning ? (
                    <div class="relative space-y-4 overflow-hidden py-10">
                      <div class="shimmer absolute -bottom-full -top-full w-12 rotate-45 bg-zinc-900 blur-xl"></div>
                      <div class="h-4 w-3/4 rounded-full bg-zinc-800"></div>
                      <div class="h-4 w-1/3 rounded-full bg-zinc-700"></div>
                      <div class="h-4 w-full rounded-full bg-zinc-800"></div>
                      <div class="h-4 w-2/3 rounded-full bg-zinc-700"></div>
                    </div>
                  ) : searchTrack.value ? (
                    Object.keys(searchTrack.value).length ? (
                      <>
                        <p class="fade-in mt-2 whitespace-pre-wrap text-lg font-semibold leading-loose text-zinc-300">
                          {searchTrack.value.lyrics}
                        </p>
                        <div class="sticky bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-zinc-900/0"></div>
                      </>
                    ) : (
                      <p class="py-10 text-center text-lg font-semibold text-zinc-500">
                        No lyrics found
                      </p>
                    )
                  ) : (
                    <p class="py-10 text-center text-lg font-semibold text-zinc-500">
                      No lyrics yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="border-t border-zinc-800 py-4 text-center text-sm text-zinc-300">
        <p>
          Made with ❤️ by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/iamaeron"
            class="font-medium text-sky-400 underline-offset-2 hover:underline"
          >
            Aeron
          </a>
          .
        </p>
      </footer>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Lywik",
  meta: [
    {
      name: "description",
      content: "Search lyrics for your favorite song!",
    },
  ],
};
