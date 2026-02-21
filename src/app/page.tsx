import { Metadata } from "next";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import HomeSlider from "./_components/HomeSlider/HomeSlider";
import MainProduct from "./_components/MainProduct/MainProduct";
import FrameMotion from "./_components/FrameMotion/FrameMotion";

export const metadata: Metadata = {
  title: 'Fresh Cart Home',
  description: 'E-Commerce App For Shopping.',
};
export default function Home() {

  return (
    <>
      <FrameMotion>
        <div className="container py-8 space-y-12">
          <HomeSlider />
          <CategorySlider />
          <MainProduct />
        </div>
      </FrameMotion>
    </>
  );
}
