import React from "react";

const instagramImages = [
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=500&q=90",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=90",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=90",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=90",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=90",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=90",
  "https://images.unsplash.com/photo-1506629905607-d9c297d1d6ee?auto=format&fit=crop&w=500&q=90",
];

const InstagramSection = () => {
  return (
    <section className="bg-white pt-16">

      <div className="mx-auto max-w-[550px] px-5 text-center">

        <h2 className="font-serif text-[26px]">
          Follow Us On Instagram
        </h2>

        <p className="mt-2 text-[8px] leading-[1.8] text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed eleifend euismod nunc.
        </p>

      </div>

      <div className="mt-9 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7">

        {instagramImages.map((image, index) => (
          <div
            key={index}
            className="h-[150px] overflow-hidden md:h-[205px]"
          >

            <img
              src={image}
              alt={`Instagram ${index + 1}`}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />

          </div>
        ))}

      </div>

    </section>
  );
};

export default InstagramSection;