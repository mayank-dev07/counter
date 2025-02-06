import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program } from "../anchor/setup";

export default function IncrementButton() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    console.log("clicked");

    if (!publicKey) return;

    setIsLoading(true);

    try {
      const transaction = await program.methods.increment().transaction();

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      console.log(
        `View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="w-24" onClick={onClick} disabled={!publicKey}>
        {isLoading ? "Loading" : "Increment"}
      </button>
    </>
  );
}
