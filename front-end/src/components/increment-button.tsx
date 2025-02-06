import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program, counterPDA } from "../anchor/setup";

export default function IncrementButton() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    setIsLoading(true);

    try {
      // Create the increment instruction
      const transaction = await program.methods
        .increment()
        .accounts({
          counter: counterPDA,
          user: publicKey,
        })
        .transaction();

      // Send the transaction
      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      console.log(
        `View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`
      );
    } catch (error) {
      console.error("Failed to increment counter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="w-24"
      onClick={onClick}
      disabled={!publicKey || isLoading}
    >
      {isLoading ? "Loading..." : "Increment"}
    </button>
  );
}
