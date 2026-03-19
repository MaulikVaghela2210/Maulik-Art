import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceService";
import type { Service } from "../../types/service";

import {
  Paintbrush,
  Pencil,
  Box,
  Archive,
} from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  painting: <Paintbrush size={36} className="text-blue-500" />,
  sketch: <Pencil size={36} className="text-green-500" />,
  sculpture: <Box size={36} className="text-purple-500" />,
};

const ServicesSection = () => {

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {

    const fetchServices = async () => {

      const { data } = await getServices();

      setServices(data);

    };

    fetchServices();

  }, []);

  return (

    <section className="py-28 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-gray-100">

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        {services.map((service) => (

          <div
            key={service._id}
            className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
          >

            <div className="mb-4 flex justify-center">

              {iconMap[service.title.toLowerCase()] || (
                <Archive size={36} className="text-gray-400" />
              )}

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              {service.title}
            </h3>

            <p className="text-gray-600 text-center">
              {service.description}
            </p>

          </div>

        ))}

      </div>

    </section>

  );

};

export default ServicesSection;