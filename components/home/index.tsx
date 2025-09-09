"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { COINLIST } from "@/config/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { zeroAddress } from "viem";
import { useActions } from "@/hooks/use-action";
import { mainnet } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { modal, useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useAppKitWallet } from "@reown/appkit-wallet-button/react";

export default function Home({ priceData }: { priceData: any }) {
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [status, setStatus] = useState(0); // 0: disconnected, 1: evm wallet connected, 2: solana wallet connected
  const [coin, setCoin] = useState<{
    network: string;
    name: string;
    symbol: string;
    icon: string;
    address: string;
    decimals: number;
    explorer: string;
    chain: AppKitNetwork;
  }>({
    network: "ETH",
    name: "ETH",
    symbol: "ERC-20",
    icon: "/eth.png",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    explorer: "https://etherscan.io/",
    chain: mainnet,
  });

  const handleSelectCoin = (c: any, t: any) => {
    setCoin({
      network: c.name,
      name: t.name,
      symbol: c.symbol,
      icon: t.icon,
      address: t.address,
      decimals: t.decimals,
      explorer: c.explorer,
      chain: c.chain,
    });
  };

  const [value, setValue] = useState("1");
  const [ionxValue, setIonxValue] = useState(
    (priceData[coin.name] / priceData["IONX"]).toString()
  );

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;

    // Allow empty string
    if (inputValue === "") {
      setValue("");
      return;
    }

    // Only allow positive numbers (including decimals)
    const regex = /^\d*\.?\d*$/;
    if (regex.test(inputValue) && parseFloat(inputValue) >= 0) {
      const ionxAmount =
        (parseFloat(inputValue) * priceData[coin.name]) / priceData["IONX"];
      setValue(inputValue);
      setIonxValue(ionxAmount.toString());
    }
  };

  const handleIonxInputChange = (e: any) => {
    const inputValue = e.target.value;

    // Allow empty string
    if (inputValue === "") {
      setIonxValue("");
      return;
    }

    // Only allow positive numbers (including decimals)
    const regex = /^\d*\.?\d*$/;
    if (regex.test(inputValue) && parseFloat(inputValue) >= 0) {
      const coinAmount =
        (parseFloat(inputValue) * priceData["IONX"]) / priceData[coin.name];
      setIonxValue(inputValue);
      setValue(coinAmount.toString());
    }
  };

  const { buyEvmCoin, buyEvmToken, buySol } = useActions();

  const buyEvmCoinMutation = useMutation({
    mutationFn: buyEvmCoin,
    onSuccess: async (_data) => {
      if (_data.success) {
        toast.success("Successful!", {
          description: (
            <div className="text-black">
              {value} {coin.name} has been deposited for buying ${ionxValue}{" "}
              IONX.{" "}
              <a href={`${coin.explorer}tx/${_data.hash}`} target="_blank">
                See transaction
              </a>
              <br />
              All the purchased tokens will be distributed to your wallet
              address once the presale is over.
            </div>
          ),
          duration: 5000,
          position: "bottom-right",
          style: { border: "1px solid #00000090" },
        });
      }
    },
  });

  const buyEvmTokenMutation = useMutation({
    mutationFn: buyEvmToken,
    onSuccess: async (_data) => {
      if (_data.success) {
        toast.success("Successful!", {
          description: (
            <div className="text-black">
              {value} {coin.name} has been deposited for buying ${ionxValue}{" "}
              IONX.{" "}
              <a href={`${coin.explorer}tx/${_data.hash}`} target="_blank">
                See transaction
              </a>
              <br />
              All the purchased tokens will be distributed to your wallet
              address once the presale is over.
            </div>
          ),
          duration: 5000,
          position: "bottom-right",
          style: { border: "1px solid #00000090" },
        });
      }
    },
  });

  const buySolMutation = useMutation({
    mutationFn: buySol,
    onSuccess: async (_data) => {
      if (_data.success) {
        toast.success("Successful!", {
          description: (
            <div className="text-black">
              {value} {coin.name} has been deposited for buying ${ionxValue}{" "}
              IONX.{" "}
              <a href={`${coin.explorer}tx/${_data.hash}`} target="_blank">
                See transaction
              </a>
              <br />
              All the purchased tokens will be distributed to your wallet
              address once the presale is over.
            </div>
          ),
          duration: 5000,
          position: "bottom-right",
          style: { border: "1px solid #00000090" },
        });
      }
    },
  });

  const handleBuy = () => {
    if (coin.name === "SOL") {
      if (status !== 2) {
        toast.warning("Solana Wallet Not Connected", {
          description: (
            <div className="text-black">Please connect solana wallet.</div>
          ),
          duration: 5000,
          position: "bottom-right",
          style: { border: "1px solid #00000090" },
        });
        return;
      }
      buySolMutation.mutate(BigInt(Number(value) * 1e9));
    } else {
      if (status !== 1) {
        toast.warning("EVM Wallet Not Connected", {
          description: (
            <div className="text-black">Please connect EVM wallet.</div>
          ),
          duration: 5000,
          position: "bottom-right",
          style: { border: "1px solid #00000090" },
        });
        return;
      }

      if (coin.address === zeroAddress)
        buyEvmCoinMutation.mutate({
          coin,
          amount: BigInt(Number(value) * 10 ** coin.decimals),
        });
      else
        buyEvmTokenMutation.mutate({
          coin,
          amount: BigInt(Number(value) * 10 ** coin.decimals),
        });
    }
  };

  useEffect(() => {
    if (caipAddress?.startsWith("solana")) setStatus(2);
    else if (caipAddress?.startsWith("eip155")) setStatus(1);
    else setStatus(0);
  }, [caipAddress]);

  useEffect(() => {
    modal?.switchNetwork(coin.chain);
    setIonxValue(
      (
        (parseFloat(value) * priceData[coin.name]) /
        priceData["IONX"]
      ).toString()
    );
  }, [coin]);

  const { connect } = useAppKitWallet();

  return (
    <main className="flex flex-col gap-[16px] max-w-[450px] p-4 row-start-2 bg-orange-100 items-center border border-amber-400 rounded-2xl">
      <div className="flex flex-col gap-[24px] w-full p-4 items-center bg-orange-200 border border-amber-400 rounded-2xl">
        <div className="text-md font-bold items-center text-center">
          Select Crypto
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          {COINLIST.map((c) => {
            const isSelected = coin && coin.symbol === c.symbol;
            return (
              <div
                className={`p-2 cursor-pointer bg-orange-100 border rounded-2xl ${
                  isSelected ? "border-blue-700" : "border-white"
                }`}
                key={c.symbol}
                onClick={() =>
                  c.tokens.length > 1 ? null : handleSelectCoin(c, c.tokens[0])
                }
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between gap-2 h-8">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full">
                          <AvatarImage
                            src={isSelected ? coin.icon : c.icon}
                            alt={c.name}
                          />
                          <AvatarFallback className="rounded-full">
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          {
                            <span className="text-md font-medium">
                              {isSelected ? coin.name : c.name}
                            </span>
                          }
                          {isSelected && (
                            <span className="text-xs font-medium">
                              {c.symbol}
                            </span>
                          )}
                        </div>
                      </div>
                      {c.tokens.length > 1 && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  {c.tokens.length > 1 && (
                    <DropdownMenuContent
                      className="w-(--radix-dropdown-menu-trigger-width) bg-orange-50 min-w-56 rounded-lg"
                      align="start"
                      side="bottom"
                      sideOffset={4}
                    >
                      {c.tokens.map((t) => (
                        <DropdownMenuItem
                          onClick={() => handleSelectCoin(c, t)}
                          className="gap-2 p-2 cursor-pointer"
                          key={c.name + t.address}
                        >
                          <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage src={t.icon} alt={t.name} />
                            <AvatarFallback className="rounded-full">
                              CN
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-md font-medium">
                              {t.name}
                            </span>
                            <span className="text-xs font-medium">
                              {c.symbol}
                            </span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[24px] w-full p-4 items-center bg-orange-200 border border-amber-400 rounded-2xl">
        <div className="text-md font-bold items-center text-center">
          Enter Amount
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Conversion amount
              </Label>

              <div className="relative">
                <Input
                  id="amount"
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="py-6 pr-28 text-lg rounded-xl bg-orange-100"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={coin.icon} alt={coin.name} />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-md font-medium">{coin.name}</span>
                    <span className="text-xs font-medium">{coin.symbol}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Total tokens received
              </Label>

              <div className="relative">
                <Input
                  id="amount"
                  type="text"
                  value={ionxValue}
                  onChange={handleIonxInputChange}
                  placeholder="0"
                  className="py-6 pr-28 text-lg rounded-xl bg-orange-100"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src="/ionx.png" alt="ionx" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-md font-medium">IONX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isConnected ? (
        <Button
          variant="outline"
          size="lg"
          onClick={() => modal?.disconnect()}
          className="w-full flex flex-col gap-0 text-sm font-medium cursor-pointer bg-orange-300 border-1 border-amber-400"
        >
          <div className="">Disconnect</div>
          <div className="">
            ({address?.slice(0, 6)}...{address?.slice(-6)})
          </div>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="w-full text-md font-medium cursor-pointer bg-orange-300 border-1 border-amber-400"
            >
              Connect Wallet
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-84 max-w-96 bg-orange-50">
            <DropdownMenuLabel>Connect Wallet</DropdownMenuLabel>
            <div className="flex flex-col">
              <DropdownMenuItem className="p-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => connect("walletConnect")}
                  className="w-full bg-orange-200 relative text-md border-amber-400"
                >
                  <Avatar className="absolute left-1 h-8 w-8 rounded-md">
                    <AvatarImage
                      src="/walletconnect.webp"
                      alt="walletconnect"
                    />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  WalletConnect
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => connect("metamask")}
                  className="w-full bg-orange-200 relative text-md border-amber-400"
                >
                  <Avatar className="absolute left-1 h-8 w-8 rounded-md">
                    <AvatarImage src="/metamask.webp" alt="walletconnect" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  MetaMask
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => connect("phantom")}
                  className="w-full bg-orange-200 relative text-md border-amber-400"
                >
                  <Avatar className="absolute left-1 h-8 w-8 rounded-md">
                    <AvatarImage src="/phantom.webp" alt="walletconnect" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  Phantom
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => connect("coinbase")}
                  className="w-full bg-orange-200 relative text-md border-amber-400"
                >
                  <Avatar className="absolute left-1 h-8 w-8 rounded-md">
                    <AvatarImage src="/coinbase.webp" alt="walletconnect" />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  Coinbase
                </Button>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <Button
        variant="outline"
        size="lg"
        onClick={() => handleBuy()}
        className="w-full text-md font-medium cursor-pointer bg-orange-300 border-1 border-amber-400"
      >
        Buy Now
      </Button>
    </main>
  );
}
