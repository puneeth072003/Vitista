import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

import { useRef } from "react";

function HomeCarousel() {
  const carouselButton = useRef<HTMLButtonElement | null>(null);

  const blogPosts = [
    {
      title: "10 Common Childhood Illnesses and their Treatment",
      img_link: "https://www.carehospitals.com/assets/images/main/comm-10.webp",
      author: "Care Hospitals",
      site_link:
        "https://www.carehospitals.com/blog-detail/10-common-childhood-illnesses-and-their-treatment/",
    },

    {
      title: "How to Increase White Blood Cell Count",
      img_link:
        "https://www.carehospitals.com/assets/images/main/how-to-increase-white-blood-cell-count.webp",
      author: "Care Hospitals",
      site_link:
        "https://www.carehospitals.com/blog-detail/how-to-increase-white-blood-cell-count/",
    },
    {
      title: "How does Calcium Deficiency affect Bone Health?",
      img_link:
        "https://www.carehospitals.com/assets/images/main/how-does-calcium-deficiency-affect-bone-health.webp",
      author: "Care Hospitals",
      site_link:
        "https://www.carehospitals.com/blog-detail/how-does-calcium-deficiency-affect-bone-health/",
    },
  ];

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[19rem]">
          {blogPosts.map((post, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-4">
                <Card className="h-[17rem] bg-[rgba(255,255,255,0.2)] flex justify-center items-center overflow-hidden">
                  <CardContent className="flex flex-col items-center justify-center h-full px-3 py-0 gap-2 before:content-none after:content-none">
                    <img
                      className="rounded-[30px] w-[30rem] aspect-auto"
                      src={post.img_link}
                      alt="blog-image"
                    />
                    <h1 className="font-[Poppins] text-[1rem]">
                      <a href={post.site_link} target="_blank">
                        {post.title}
                      </a>
                    </h1>
                    <h3 className="text-right w-full pr-5 font-[Rubik]">
                      By: {post.author}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext ref={carouselButton} className="hidden" />
      </Carousel>
    </>
  );
}

export default HomeCarousel;
