// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";

// import "../assets/styles/CarrrouselStyle.css";

// export default function Carrousel() {
//   return (
//     <>
//       <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
//         <SwiperSlide>
//           <img
//             src="./src/assets/images/carousel/49dbc80f-3566-46f9-b294-b2fddb2fe8ae.jpeg"
//             alt=""
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="./src/assets/images/carousel/391cd6c1-8042-4ada-bfbf-6da86c8e5527.jpeg"
//             alt=""
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="./src/assets/images/carousel/cfc9edb1-3e28-4ecd-8de5-21425d7d29ce.jpeg"
//             alt=""
//           />
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }

import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

export default function Carrousel() {
  return (
    <>
      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="./src/assets/images/carousel/49dbc80f-3566-46f9-b294-b2fddb2fe8ae.jpeg"
            alt="slide 1"
          />
        </CCarouselItem>

        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="./src/assets/images/carousel/391cd6c1-8042-4ada-bfbf-6da86c8e5527.jpeg"
            alt="slide 2"
          />
        </CCarouselItem>

        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="./src/assets/images/carousel/cfc9edb1-3e28-4ecd-8de5-21425d7d29ce.jpeg"
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
    </>
  );
}
