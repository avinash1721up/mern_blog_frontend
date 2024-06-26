import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import CategoryCard from "./CategoryCard";

type Category = {
  name: string;
  path: string;
  bgcolor: string;
};

const CategoriesSlider = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogcategories`)
      .then((res) => {
        return res.json();
      })
      .then(async (response) => {
        // console.log(response.categories)
        // let catobj = {
        //   name: string;
        //   path: string;
        //   bgcolor: string;
        // }

        const tempcat = await Promise.all(
          response.categories.map(async (category: string) => ({
            name: category,
            path: category,
            bgcolor: "white",
            // bgcolor: await generate(),
          }))
        );
        // console.log(tempcat)
        setCategories(tempcat);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="sliderout">
      <h1>Categories</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {categories.map((category) => {
          return (
            <SwiperSlide>
              <CategoryCard {...category} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
