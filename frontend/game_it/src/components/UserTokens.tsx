import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTTokenURI from "./NFTTokenURI";

interface TokenData {
  balance: string;
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: string;
}

const UserTokens: React.FC<{ accountAddress: string }> = ({ accountAddress }) => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accountAddress) {
      fetchTokens(accountAddress);
    }
  }, [accountAddress]);

  const fetchTokens = async (address: string) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://base-sepolia.blockscout.com/api?module=account&action=tokenlist&address=${address}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "1" && response.data.result) {
        setTokens(response.data.result);
        console.log(response.data.result[0]);
      } else {
        throw new Error("Unable to fetch tokens.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading  && (
          <ul>
            {tokens.map((token, index) => (
              <li key={index}>
                <NFTTokenURI contractAddress={token.contractAddress} />
                <p><strong>Name:</strong> {token.name}</p>
                <p><strong>Symbol:</strong> {token.symbol}</p>
                <p><strong>Balance:</strong> {parseInt(token.balance) / 10 ** parseInt(token.decimals)}</p>
                <p><strong>Contract Address:</strong> {token.contractAddress}</p>
              </li>
            ))}
          </ul>
          // <Button onClick={() => fetchTokens(accountAddress)}>Refresh</Button>        
      )}
    </div>
  );
};

export default UserTokens;
