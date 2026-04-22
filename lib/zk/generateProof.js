import * as snarkjs from "snarkjs"
import { buildPoseidon } from "circomlibjs"
import { getMerkleProof } from "@/services/auth";

export async function generateProof(secret, index) {
    if(!secret) {
        throw new Error("Secret is required to generate proof")
    }

    const poseidon = await buildPoseidon();
    const hash = poseidon([BigInt(secret)])
    const leaf = poseidon.F.toString(hash)

    const res = await getMerkleProof(index)
    if(!res.data) {
        console.log(res.message)
    }
    const { pathElements, pathIndices, root } = await res.data

    const input = {
        leaf,
        proofs: pathElements,
        pathIndexes: pathIndices,
        root: root
    }

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        "/zk/MerkleTree_js/MerkleTree.wasm",
        "/zk/MerkleTree-final.zkey"
    )

    return {
        proof,
        publicSignals,
        root
    }
}