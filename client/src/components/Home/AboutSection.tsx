import { useEffect, useState } from "react";
import { getAbout } from "../../services/aboutService";
import type { About } from "../../types/about";

const AboutSection = () => {

  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {

    const fetchAbout = async () => {
      const { data } = await getAbout();
      setAbout(data);
    };

    fetchAbout();

  }, []);

  if (!about) return null;

  return (

    <section className="py-28 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE SIDE */}
        <div className="flex justify-center">

          <div className="relative group w-[320px] md:w-[380px]">

            {/* Glow Background */}
            <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 group-hover:opacity-30 transition duration-500 rounded-3xl"></div>

            {/* Image */}
            <img
              src={about.image}
              alt="About"
              className="relative rounded-3xl shadow-2xl object-cover transform group-hover:scale-105 transition duration-500"
            />

          </div>

        </div>

        {/* TEXT SIDE */}
        <div className="space-y-7">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {about.title}
          </h2>

          {/* Decorative Line */}
          <div className="w-24 h-1 bg-blue-500 rounded"></div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            {about.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button className="bg-blue-600 text-white px-7 py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
              Explore Artworks
            </button>

            <button className="border border-gray-300 px-7 py-3 rounded-xl hover:bg-gray-100 transition">
              Contact Artist
            </button>

          </div>

        </div>

      </div>

    </section>

  );

};

export default AboutSection;