import { Program, IdlAccounts } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Counter, IDL } from "./idl_"; // Ensure the IDL is correctly imported

// Initialize the connection to the Solana devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the Anchor program
export const program = new Program<Counter>(IDL, {
  connection,
});

// Derive the PDA for the counter account
export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

// Define the type for the counter account data
export type CounterData = IdlAccounts<Counter>["counter"];
