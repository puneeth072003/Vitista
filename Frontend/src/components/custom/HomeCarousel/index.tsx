import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useEffect, useRef } from "react";

function HomeCarousel() {
  const carouselButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      carouselButton.current?.click();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[19rem]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-4">
                <Card className="h-[16.5rem] bg-[rgba(255,255,255,0.2)] flex justify-center items-center">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      Lorem ipsum dolor, sit amet consectetur adipisicing.
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext ref={carouselButton} />
      </Carousel>
    </>
  );
}

export default HomeCarousel;
