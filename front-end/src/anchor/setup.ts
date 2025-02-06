import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Counter, IDL } from "./idl";

const programId = new PublicKey("5SH9yDLw4o7BfhXHPbnepiuHWf8fvygcrhnPmMByxBm1");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<Counter>(IDL, programId, {
  connection,
});

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

export type CounterData = IdlAccounts<Counter>["counter"];
