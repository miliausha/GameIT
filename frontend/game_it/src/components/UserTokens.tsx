import React, { useEffect, useState } from "react";
import axios from "axios";

interface TokenData {
  balance: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
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
      const apiUrl = `https://blockscout.com/api?module=account&action=tokenlist&address=${address}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "1" && response.data.result) {
        setTokens(response.data.result);
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
      <h1>Users Tokens</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {token.tokenName}</p>
              <p><strong>Symbol:</strong> {token.tokenSymbol}</p>
              <p><strong>Balance:</strong> {parseInt(token.balance) / 10 ** parseInt(token.decimals)}</p>
              <p><strong>Contract Address:</strong> {token.tokenAddress}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTokens;
