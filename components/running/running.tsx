import DirectionsRun from "@mui/icons-material/DirectionsRun";

import Loading from "@/components/loading/loading";
import type { IRunning } from "@/components/running/running.d";

async function getData() {
  try {
    const response = await fetch(
      (process.env.APP_ENV === "development"
        ? process.env.URL_STRAVA_API_DEV
        : process.env.URL_STRAVA_API_PROD) as string,
      {
        cache: "force-cache",
        next: {
          revalidate: 5,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error("components/running", error);
  }
}

export default async function Running() {
  const runningContent: IRunning = {
    currentYear: new Date().getFullYear(),
    distance: await getData().then((data) => data?.distance),
  };

  return runningContent.distance ? (
    <div
      className="running
        flex
        flex-row
        items-center
        justify-center
        mb-3
        p-3
        rounded-xl
        w-full
        md:h-auto
        md:justify-center
        md:mb-0
        md:mr-3
        md:w-auto"
    >
      <div
        className="icon
          mr-3"
      >
        <DirectionsRun
          sx={{
            color: "#0ea5e9",
            width: 40,
            height: 40,
          }}
        />
      </div>

      <div
        className="total
          flex
          flex-col"
      >
        <h3
          className="year
            font-bold
            mb-1
            text-sm
            text-white"
        >
          {runningContent.currentYear}
        </h3>

        <span
          className="distance
            font-light
            text-lg
            text-white/50"
        >
          {runningContent.distance} km
        </span>
      </div>
    </div>
  ) : (
    <Loading serviceName="api strava" />
  );
}
