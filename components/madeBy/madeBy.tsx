import type { IMadeBy } from "@/components/madeBy/madeBy.d";

export default function MadeBy() {
  const contentMadeBy: IMadeBy = { label: "Made by", author: "Marcos Lima" };

  return (
    <div
      className="made-by
        flex
        flex-row
        items-center
        justify-center
        my-3"
    >
      <span
        className="line
          bg-sky-500
          block
          h-0.5
          rounded-full
          w-10"
      />

      <span
        className="text
          font-bold
          mx-3
          text-sm
          text-white"
      >
        {contentMadeBy.label}{" "}
        <a
          className="link
            duration-500
            hover:text-sky-500
            transition-all
            underline"
          href="https://github.com/skvggor"
        >
          {contentMadeBy.author}
        </a>{" "}
        in BR 🇧🇷
      </span>

      <span
        className="line
          bg-sky-500
          block
          h-0.5
          rounded-full
          w-10"
      />
    </div>
  );
}
