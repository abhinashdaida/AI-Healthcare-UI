import React from "react";

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
    <section className="bg-white px-5 py-14">

      <div className="mx-auto max-w-[1100px]">

        <div className="text-center">

          <h2 className="font-serif text-[26px]">
            Shop By Category
          </h2>

          <p className="mt-2 text-[14px] text-gray-400">
            Explore our latest fashion collections
          </p>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          {categories.map((category) => (
            <a
              href="/productlisting"
              key={category.name}
              className="group relative h-[220px] overflow-hidden bg-gray-100"
            >

              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">

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