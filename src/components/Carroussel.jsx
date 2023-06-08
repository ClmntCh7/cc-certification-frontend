import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

export default function Carrousel() {
  return (
    <>
      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="https://res.cloudinary.com/dtncewabl/image/upload/v1686263900/391cd6c1-8042-4ada-bfbf-6da86c8e5527_madjrd.jpg"
            alt="slide 1"
          />
        </CCarouselItem>

        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="https://res.cloudinary.com/dtncewabl/image/upload/v1686263900/cfc9edb1-3e28-4ecd-8de5-21425d7d29ce_hok7ie.jpg"
            alt="slide 2"
          />
        </CCarouselItem>

        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="https://res.cloudinary.com/dtncewabl/image/upload/v1686263901/49dbc80f-3566-46f9-b294-b2fddb2fe8ae_tznf3t.jpg"
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
    </>
  );
}
