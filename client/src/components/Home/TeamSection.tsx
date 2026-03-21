import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

interface Artist {
  _id: string;
  name: string;
  role: string;
  desc: string;
  img: string;

  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const TeamSection = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get(${import.meta.env.VITE_API_URL}/api/artists");
        setArtists(res.data);
      } catch (error) {
        console.log("Error fetching artists", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 relative">

        <h2 className="text-4xl font-bold mb-14 text-center">
          Meet Our Team
        </h2>

        {/* LEFT ARROW */}

        <button className="team-prev absolute top-[57%] top-1/2 -translate-y-1/2 -left-14 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition z-10">
          <FaArrowLeft />
        </button>

        {/* RIGHT ARROW */}

        <button className="team-next absolute top-[57%] top-1/2 -translate-y-1/2 -right-14 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition z-10">
          <FaArrowRight />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: ".team-next",
            prevEl: ".team-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >

          {artists.map((artist) => (

            <SwiperSlide key={artist._id}>

              <div className="bg-white rounded-xl shadow-none">

                {/* IMAGE CONTAINER */}

                <div className="overflow-hidden rounded-t-xl">

                  <img
                    src={artist.img}
                    alt={artist.name}
                    className="w-full h-64 object-cover transition duration-500 hover:scale-110"
                  />

                </div>

                {/* CARD CONTENT */}

                <div className="p-6 text-center">

                  <h3 className="text-xl font-semibold">
                    {artist.name}
                  </h3>

                  <p className="text-gray-500 mb-2">
                    {artist.role}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {artist.desc}
                  </p>

                  {/* SOCIAL ICONS */}

                  <div className="flex justify-center gap-4">

                    {artist.social?.facebook && (
                      <a
                        href={artist.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-full p-2 hover:bg-black hover:text-white transition"
                      >
                        <FaFacebookF />
                      </a>
                    )}

                    {artist.social?.twitter && (
                      <a
                        href={artist.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-full p-2 hover:bg-black hover:text-white transition"
                      >
                        <FaTwitter />
                      </a>
                    )}

                    {artist.social?.instagram && (
                      <a
                        href={artist.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-full p-2 hover:bg-black hover:text-white transition"
                      >
                        <FaInstagram />
                      </a>
                    )}

                    {artist.social?.linkedin && (
                      <a
                        href={artist.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-full p-2 hover:bg-black hover:text-white transition"
                      >
                        <FaLinkedin />
                      </a>
                    )}

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default TeamSection;