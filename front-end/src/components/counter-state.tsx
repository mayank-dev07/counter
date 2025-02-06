import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { program, counterPDA, CounterData } from "../anchor/setup";

export default function CounterState() {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<CounterData | null>(null);

  useEffect(() => {
    program.account.counter.fetch(counterPDA).then((data) => {
      setCounterData(data);
    });

    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        setCounterData(
          program.coder.accounts.decode("counter", accountInfo.data)
        );
      }
    );

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [program]);

  return <p className="text-lg">Count: {counterData?.count?.toString()}</p>;
}
