import React from "react";
import {
  LocalShippingOutlined,
  SecurityOutlined,
  Inventory2Outlined,
  SupportAgentOutlined,
} from "@mui/icons-material";

const benefits = [
  {
    icon: LocalShippingOutlined,
    title: "High Quality",
    description: "Crafted from top materials",
  },
  {
    icon: SecurityOutlined,
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: Inventory2Outlined,
    title: "Free Shipping",
    description: "Order over $150",
  },
  {
    icon: SupportAgentOutlined,
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

const BenefitsSection = () => {
  return (
    <section className="border-b border-gray-100 bg-white py-6">

      <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-6 px-5 md:grid-cols-4">

        {benefits.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3"
            >

              <Icon
                sx={{
                  fontSize: 23,
                  color: "#222",
                }}
              />

              <div>
                <h4 className="text-[8px] font-medium">
                  {item.title}
                </h4>

                <p className="mt-1 text-[7px] text-gray-400">
                  {item.description}
                </p>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default BenefitsSection;