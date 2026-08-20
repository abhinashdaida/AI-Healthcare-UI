import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
            fixed
            bottom-6
            right-6
            z-50
            bg-[#7B0FB5]
            hover:bg-[#6B0DA0]
            text-white
            w-12
            h-12
            flex
            items-center
            justify-center
            rounded-full
            shadow-lg
            transition-all
            duration-300
            cursor-pointer
          "
        >
          <Icon icon="lucide:arrow-up" width="22" height="22" />
        </button>
      )}
    </>
  );
};

export default ScrollTop;