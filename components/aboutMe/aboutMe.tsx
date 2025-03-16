import type { IAboutMe } from "@/components/aboutMe/aboutMe.d";

export default function AboutMe() {
  const aboutMeContent: IAboutMe = { title: ["Keep in touch with me"] };

  return (
    <section
      className="about-me
        flex
        flex-col
        items-center
        justify-center
        mb-3
        md:mb-10"
    >
      <h2
        className="title
          font-bold
          text-2xl
          text-sky-300
          md:text-4xl"
      >
        {aboutMeContent.title}
      </h2>
    </section>
  );
}
