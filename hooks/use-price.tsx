import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePrice = () => {
  const initialData = null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["priceData"],
    queryFn: async () => {
      const result = await axios.get("https://coinfetcher-price-6efi.onrender.com/price");

      return { ...result.data.price, USDT: 1, USDC: 1, BUSD: 1, IONX: 0.021 };
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  if (isLoading) return initialData;
  if (error) return initialData;

  return data || initialData;
};

export default usePrice;
