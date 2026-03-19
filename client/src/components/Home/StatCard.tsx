import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  link: string;
}

const StatCard = ({ title, value, icon, link }: Props) => {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate(link)}
      className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition"
    >

      <div>
        <h3 className="text-gray-500 text-sm">
          {title}
        </h3>

        <p className="text-2xl font-bold mt-2">
          {value}
        </p>
      </div>

      {icon}

    </div>

  );

};

export default StatCard;