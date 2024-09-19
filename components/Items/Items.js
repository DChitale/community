import React from "react";
import Image from "next/image"; // Import the Image component

const Items = () => {
  const items = [
    {
      id: 1,
      name: "Inverted Jenny",
      description: "A rare 1918 US postage stamp featuring an upside-down airplane.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxrQRvI0C-yl2bKO5CP__G7_lq68Uy7YsLFQ&s",
    },
    {
      id: 2,
      name: "Penny Black",
      description: "The world's first adhesive postage stamp used in the UK.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2OI1B03QT1WnvF0ra2o5oNiYoAkH81Hex-Q&s",
    },
    {
      id: 3,
      name: "Mauritius Post Office",
      description: "A famous stamp issued by the British colony of Mauritius.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mauritius_stamp.jpg/1200px-Mauritius_stamp.jpg",
    },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">Trending Philatelic Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-6">
            <Image
              src={item.image}
              alt={item.name}
              width={220} // Set the width
              height={220} // Set the height
              className="ml-8 object-fit rounded-lg shadow-md "
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <hr className="font-bold h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
