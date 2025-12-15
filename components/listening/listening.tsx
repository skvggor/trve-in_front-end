import Image from "next/image";

import Loading from "@/components/loading/loading";

async function getData() {
  try {
    const response = await fetch(
      (process.env.APP_ENV === "development"
        ? process.env.URL_LASTFM_API_DEV
        : process.env.URL_LASTFM_API_PROD) as string,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error("components/listening", error);
  }
}

export default async function Listening() {
  const MAX_LENGTH = 30;
  const currentTrack = await getData().then(
    (data) => data?.recenttracks?.track[0],
  );

  const listeningContent = {
    coverArt:
      currentTrack?.image.reduce(
        (
          acc: string,
          image: {
            size: string;
            "#text": string;
          },
        ) => {
          let result = acc;

          if (image.size === "large") result = image["#text"];

          return result;
        },
        "",
      ) || "/default-cover-art.webp",
    artist: currentTrack?.artist["#text"],
    track: currentTrack?.name,
    status: currentTrack?.["@attr"]?.nowplaying,
  };

  const label = listeningContent.status ? "Listening now" : "Last played";

  return currentTrack ? (
    <div
      className="listening-now
        backdrop-blur-xs
        flex
        flex-row
        items-center
        justify-start
        min-w-[350px]
        p-3
        relative
        rounded-xl
        shadow-2xl"
    >
      <div
        className="cover-art
          h-[100px]
          min-h-[100px]
          min-w-[100px]
          mr-3
          rounded-full
          shadow-2xl
          w-[100px]
          z-10"
      >
        <Image
          className={`image-cover
            border-[#FFF]/10
            border-[5px]
            border-solid
            h-full
            object-cover
            rounded-full
            shadow-2xl
            w-full
            ${listeningContent.status ? "animate-pulse" : ""}`}
          src={listeningContent.coverArt}
          alt="Cover art"
          width={100}
          height={100}
        />
      </div>
      <div
        className="track-info
          flex
          flex-col
          max-w-md
          z-10"
      >
        <span
          className="label
            font-light
            max-w-fit
            mb-3
            p-2
            ring-1
            ring-sky-400
            rounded-full
            text-sky-500
            text-xs
            uppercase"
        >
          {label}
        </span>

        <span
          className="track
            font-bold
            mb-1
            text-lg
            text-white"
        >
          {listeningContent.track.length > MAX_LENGTH
            ? `${listeningContent.track.substring(0, MAX_LENGTH)}...`
            : listeningContent.track}
        </span>

        <span
          className="artist
            font-medium
            text-base
            text-white/50
            uppercase"
        >
          {listeningContent.artist}
        </span>
      </div>
      <div
        className="background-with-blur
          absolute
          bg-gray-900
          h-full
          inset-0
          opacity-50
          overflow-hidden
          rounded-xl
          w-full
          z-0"
      >
        <Image
          className="image-background
            blur-2xl
            rounded-xl
            saturate-200"
          src={listeningContent.coverArt}
          alt="Cover art"
          width={150}
          height={150}
        />
      </div>
    </div>
  ) : (
    <Loading serviceName="last.fm" />
  );
}
