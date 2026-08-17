import React from "react";

const brands = [
  {
    name: "CHANEL",
    className: "font-bold tracking-[2px]",
  },
  {
    name: "LOUIS VUITTON",
    className: "font-serif text-[11px]",
  },
  {
    name: "PRADA",
    className: "font-serif text-[19px] font-bold tracking-[2px]",
  },
  {
    name: "Calvin Klein",
    className: "font-light",
  },
  {
    name: "DENIM",
    className: "font-bold tracking-[2px]",
  },
];

const BrandStrip = () => {
  return (
    <section className="border-y border-[#f3f3f3] bg-white py-7">

      <div className="mx-auto flex max-w-[950px] flex-wrap items-center justify-center gap-x-10 gap-y-5 px-5 md:justify-between">

        {brands.map((brand) => (
          <span
            key={brand.name}
            className={`text-black ${brand.className}`}
          >
            {brand.name}
          </span>
        ))}

      </div>

    </section>
  );
};

export default BrandStrip;