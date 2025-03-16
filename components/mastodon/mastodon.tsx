import type { IMastodon } from "@/components/mastodon/mastodon.d";

export default function Mastodon() {
  const contentMastodon: IMastodon = {
    rel: "me",
    text: "Mastodon",
    link: "https://hachyderm.io/@skvggor",
  };

  return (
    <div
      className="mastodon
      h-0
      opacity-0
      overflow-hidden
    "
    >
      <a
        className="mastodon-link"
        rel={contentMastodon.rel}
        href={contentMastodon.link}
      >
        {contentMastodon.text}
      </a>
    </div>
  );
}
