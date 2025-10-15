import Image from "next/image";

import type {
  IHeaderContent,
  IStatusIndicator,
} from "@/components/header/header.d";
import Status from "@/components/status/status";

async function getData() {
  try {
    const response = await fetch(
      (process.env.APP_ENV === "development"
        ? process.env.URL_STATUS_API_DEV
        : process.env.URL_STATUS_API_PROD) as string,
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
    console.error("components/status", error);
  }
}

export default async function Header() {
  const data = await getData().then((data) => data);

  const headerContent: IHeaderContent = {
    title: "skvggor",
    currentPosition: [
      "Father — street runner — skateboarder — senior dev at ",
      <a
        key="employer"
        href="https://www.radixeng.com/"
        target="_blank"
        aria-label="New window link."
        className="link
          text-sky-500
          underline"
        rel="noreferrer"
      >
        @radixeng
      </a>,
    ],
    image: {
      src: "/plants.jpg",
      alt: "avatar",
      width: 200,
      height: 200,
    },
    statusFromAPI: {
      time: data.time,
      status: data.status,
    },
  };

  const statusIndicators: Record<string, IStatusIndicator> = {
    weekend: { indicatorBg: "bg-green-500", animate: "animate-ping" },
    sleep: { indicatorBg: "bg-gray-400", animate: "animate-none" },
    lunch: { indicatorBg: "bg-sky-300", animate: "animate-ping" },
    work: { indicatorBg: "bg-red-700", animate: "animate-ping" },
    free: { indicatorBg: "bg-green-500", animate: "animate-ping" },
    listening: { indicatorBg: "bg-violet-600", animate: "animate-ping" },
  };

  return (
    <header
      className="site-header
        flex
        flex-col
        group
        items-center
        justify-center
        w-full
        md:flex-row"
    >
      <section
        className="avatar
          h-24
          mb-3
          relative
          rounded-full
          w-24
          md:h-32
          md:mb-0
          md:mr-5
          md:w-32"
      >
        <Image
          src={headerContent.image.src}
          alt={headerContent.image.alt}
          width={headerContent.image.width}
          height={headerContent.image.height}
          className="image-avatar
            aspect-square
            border-2
            border-gray-700
            duration-500
            group-hover:border-gray-500
            h-full
            object-cover
            p-0.5
            rounded-full
            transition-all
            w-full"
        />

        <span
          className={`icon-status
            absolute
            ${statusIndicators[`${headerContent.statusFromAPI.status}`].indicatorBg}
            border-[#020817]
            border-2
            bottom-2
            duration-500
            h-4
            right-1
            rounded-full
            transition-all
            z-[2]
            w-4
            md:h-5
            md:right-1
            md:w-5`}
        />
        <span
          className={`icon-status-ping
            absolute
            ${statusIndicators[`${headerContent.statusFromAPI.status}`].animate}
            ${statusIndicators[`${headerContent.statusFromAPI.status}`].indicatorBg}
            bottom-2
            duration-1000
            ease-in-out
            h-4
            right-1
            rounded-full
            transition
            w-4
            z-[1]
            md:h-5
            md:right-1
            md:w-5`}
        />
      </section>

      <section
        className="holder-text
          flex
          flex-col
          items-center
          w-full
          md:items-start
          md:w-auto
        "
      >
        <h1
          className="name
            duration-500
            font-medium
            group-hover:text-white
            text-5xl
            text-sky-300
            transition-all
            uppercase
            md:ml-3
            md:text-6xl
            md:tracking-tighter"
        >
          {headerContent.title}
        </h1>

        <section
          className="border-gradient
            bg-gradient-to-r from-sky-900 to-sky-300
            my-5
            px-px
            py-px
            rounded-full
            w-100%
            md:my-2
            md:w-auto"
        >
          <section
            className="bg-[#020817]
              flex
              place-content-center
              px-3
              py-px
              rounded-full
              w-[100%]
              md:w-auto"
          >
            <h2
              className="current-position
                font-normal
                group-hover:text-white
                text-center
                text-lg
                text-sky-300
                transition-all
                leading-none
                max-w-[250px]
                py-2.5
                md:max-w-[100%]
                md:text-xl
                md:tracking-tight
                md:w-auto"
            >
              {headerContent.currentPosition}
            </h2>
          </section>
        </section>

        <section className="holder-status ml-3">
          <Status dataFromAPI={headerContent.statusFromAPI} />
        </section>
      </section>
    </header>
  );
}
