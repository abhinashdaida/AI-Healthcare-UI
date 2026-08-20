import React from "react";

// List of product categories displayed in the section
const categories = [
  {
    name: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=90",
  },
  {
    name: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=90",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=90",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=500&q=90",
  },
];

const Categories = () => {
  return (
    // Main Shop By Category section
    <section className="bg-white px-5 py-14">

      {/* Container to control the maximum width */}
      <div className="mx-auto max-w-[1100px]">

        {/* Category section heading and description */}
        <div className="text-center">

          {/* Section title */}
          <h2 className="font-serif text-[26px]">
            Shop By Category
          </h2>

          {/* Section description */}
          <p className="mt-2 text-[14px] text-gray-400">
            Explore our latest fashion collections
          </p>
        </div>

        {/* Responsive category grid
            2 columns on small screens and 4 columns on medium screens */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Loop through each category and create a category card */}
          {categories.map((category) => (

            // Clicking a category navigates to the product listing page
            <a
              href="/productlisting"
              key={category.name}
              className="group relative h-[220px] overflow-hidden bg-gray-100"
            >
              {/* Category image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay at the bottom of the image */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                {/* Category name displayed over the image */}
                <h3 className="text-center text-sm font-medium text-white">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;