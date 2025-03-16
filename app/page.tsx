import AboutMe from "@/components/aboutMe/aboutMe";
import Header from "@/components/header/header";
import Listening from "@/components/listening/listening";
import MadeBy from "@/components/madeBy/madeBy";
import Mastodon from "@/components/mastodon/mastodon";
import Running from "@/components/running/running";
import Social from "@/components/social/social";

export default function Home() {
  return (
    <main
      className="main-content
        bg-gray-950
        flex
        flex-col
        justify-between
        min-h-[100dvh]
        pt-10
        px-3
        md:pt-20
        md:px-5
        tall:min-h-[768px]"
    >
      <Header />

      <section
        className="site-content
          flex
          flex-col
          items-center
          justify-center
          w-full"
      >
        <AboutMe />
        <Social />
      </section>

      <footer
        className="site-footer
          flex
          flex-col
          items-center
          justify-center"
      >
        <div
          className="holder
            flex
            flex-col
            items-center
            items-stretch
            justify-center
            max-w-[1024px]
            md:flex-row"
        >
          <Running />
          <Listening />
        </div>

        <MadeBy />
        <Mastodon />
      </footer>
    </main>
  );
}
