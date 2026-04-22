import { useState } from "react";
import { generateProof } from "@/lib/zk/generateProof";

export default function Home() {
  const [secret, setSecret] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [proof, setProof] = useState(null)
  const [publicSignals, setPublicSignals] = useState(null)

  const handleGenerateProof = async() => {
    try {
      setLoading(true);
      const { proof, publicSignals } = await generateProof(secret, index)
      console.log("proof :", JSON.stringify(proof))
      console.log("publicSignals :", publicSignals)
      // setProof(proof)
      // setPublicSignals(publicSignals)
    } catch (error) {
      console.error("Error generating proof:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 px-32">
      <div className="mt-8">
        <h1 className="text-3xl font-semibold">Generate Proof</h1>
        <p className="text-sm opacity-75">Generate proof before login!</p>

        <input 
          className="mt-4 w-full bg-gray-100 p-3 outline-none"
          placeholder="enter your secret..."
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <input 
          className="mt-4 w-full bg-gray-100 p-3 outline-none"
          placeholder="enter your leaf index..."
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button className="bg-blue-400 text-white w-full py-3 mt-2 cursor-pointer hover:bg-blue-500 transition-all duration-300" onClick={handleGenerateProof}>
          {loading ? "generating..." : "generate proof!"}
        </button>
      </div>
    </div>
  );
}
