import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-20 py-16 mt-20">
      
      <div className="grid grid-cols-3 gap-10">
        
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Maulik.art</h2>
          <p className="text-gray-400">
            Maulik.art is a premium handmade art studio creating custom
            paintings, sketches and sculptures crafted with passion and
            creativity.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/custom-order">Order Now</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <div className="space-y-3 text-gray-400">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 9876543210
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> info@maulikart.com
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-gray-300">
              <Instagram />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Facebook />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Phone />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Maulik.art. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;