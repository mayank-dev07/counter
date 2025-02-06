import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { program, counterPDA, CounterData } from "../anchor/setup";

export default function CounterState() {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<CounterData | null>(null);

  useEffect(() => {
    // Fetch the counter account data
    const fetchCounterData = async () => {
      try {
        const data = await program.account.counter.fetch(counterPDA);
        console.log("Counter Data:", data);
        setCounterData(data);
      } catch (error) {
        console.error("Failed to fetch counter data:", error);
      }
    };

    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        try {
          const decodedData = program.coder.accounts.decode(
            "counter",
            accountInfo.data
          );
          console.log("Updated Counter Data:", decodedData);
          setCounterData(decodedData);
        } catch (error) {
          console.error("Failed to decode counter data:", error);
        }
      }
    );
    fetchCounterData();

    // Cleanup the subscription on unmount
    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection]);

  return <p className="text-lg">Count: {counterData?.count?.toString()}</p>;
}
