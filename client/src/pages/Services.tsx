import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const Services = () => {
  return (
    <>
      <Navbar />

      <section className="px-20 py-20 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-16">
          Our Services
        </h1>

        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-lg p-8 rounded-2xl text-center">
            <div className="text-5xl mb-6">🎨</div>
            <h2 className="text-2xl font-semibold mb-4">Painting</h2>
            <p className="text-gray-600">
              Custom canvas paintings, modern art, spiritual art,
              and personalized wall art.
            </p>
          </div>

          <div className="bg-white shadow-lg p-8 rounded-2xl text-center">
            <div className="text-5xl mb-6">✏️</div>
            <h2 className="text-2xl font-semibold mb-4">Sketch</h2>
            <p className="text-gray-600">
              Realistic pencil portraits, charcoal sketch,
              and custom hand-drawn artwork.
            </p>
          </div>

          <div className="bg-white shadow-lg p-8 rounded-2xl text-center">
            <div className="text-5xl mb-6">🗿</div>
            <h2 className="text-2xl font-semibold mb-4">Sculpture</h2>
            <p className="text-gray-600">
              Handmade sculptures, clay modeling,
              and artistic decorative pieces.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;