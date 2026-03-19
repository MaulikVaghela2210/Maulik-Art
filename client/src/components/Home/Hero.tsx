import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

interface Slide {
  _id: string;
  title: string;
  desc: string;
  img: string;
  bg: string;
}

const Hero = () => {

  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const fetchSlides = async () => {

      const res = await fetch("http://localhost:5000/api/hero");
      const data = await res.json();

      setSlides(data);

    };

    fetchSlides();

  }, []);

  useEffect(() => {

    if (slides.length === 0) return;

    const slider = setInterval(() => {

      setCurrent((prev) => (prev + 1) % slides.length);

    }, 4000);

    return () => clearInterval(slider);

  }, [slides]);

  if (slides.length === 0) {

    return (
      <div className="h-[420px] flex items-center justify-center">
        Loading Hero...
      </div>
    );

  }

  const slide = slides[current];

  return (

    <section
      className={`relative bg-gradient-to-r ${slide.bg} overflow-hidden py-5 transition-all duration-700`}
    >

      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between min-h-[420px]">

        {/* LEFT CONTENT */}

        <div className="md:w-1/2">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {slide.title}
          </h1>

          <p className="text-gray-700 text-lg mb-8">
            {slide.desc}
          </p>

          <div className="flex gap-4">

            <Link
              to="/custom-order"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Custom Order
            </Link>

            <Link
              to="/gallery"
              className="border border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              View Gallery
            </Link>

          </div>

        </div>

        {/* IMAGE */}

        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">

          <Tilt
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1200}
          >

            <div className="w-[450px] h-[450px] flex items-center justify-center">

              <img
                key={slide.img}
                src={slide.img}
                alt="Artwork"
                className="max-h-full max-w-full object-contain transition-all duration-700 drop-shadow-2xl"
              />

            </div>

          </Tilt>

        </div>

      </div>

    </section>

  );

};

export default Hero;