// AdvertisementCard.tsx

import React from "react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface AdvertisementProps {
  advertisement: Advertisement; // Use the Advertisement type
}

const AdvertisementCard: React.FC<AdvertisementProps> = ({ advertisement }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200 ease-in-out">
      <h2 className="text-lg font-semibold text-gray-800">{advertisement.title}</h2>
      <p className="text-sm text-gray-700 line-clamp-3">{advertisement.description}</p>
      <Link 
        href={advertisement.link} 
        target="_blank" 
        className="mt-2 inline-flex items-center text-blue-500"
      >
        Visit Link <FaExternalLinkAlt className="ml-1" />
      </Link>
    </div>
  );
};

export default AdvertisementCard;
