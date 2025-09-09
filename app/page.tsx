"use client";
import Home from "@/components/home";
import usePrice from "@/hooks/use-price";

export default function Page() {
  const priceData = usePrice()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      {priceData && <Home priceData={priceData} />}
    </div>
  );
}
