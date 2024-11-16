import { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import Image from "next/image";
import Cat from "@/images/date-cat.png";

const contractABI = [
  "function tokenURI(uint256 tokenId) external view returns (string)"
];

const NFTTokenURI: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTImage = async () => {
      try {
        const provider = new BrowserProvider.JsonRpcProvider("https://rpc.blockscout.com/");
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const tokenId = 1;
        const tokenURI: string = await contract.tokenURI(tokenId);
        const resolvedURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        const response = await fetch(resolvedURI);
        const metadata = await response.json();
        setImageUrl(metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
      } catch (error) {
        console.error("Ошибка при получении NFT:", error);
      }
    };

    fetchNFTImage();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <div className="rounded-3xl shadow-xl text-center bg-gradient-primary w-80 h-80 flex justify-center items-center">
            <Image src={imageUrl} alt="NFT"/>
        </div>
      ) : (
        <div className="rounded-3xl shadow-xl text-center bg-gradient-primary w-80 h-80 flex justify-center items-center">
          <Image src={Cat} alt='Cat' />
        </div>
      )}
    </div>
  );
};

export default NFTTokenURI;

