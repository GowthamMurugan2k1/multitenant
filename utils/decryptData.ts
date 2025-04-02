import NodeRSA from "node-rsa";

export function decryptData(encryptedData: string) {
  try {
    const privKey = process.env.PRIVATE_KEY;
    if (!privKey) {
      throw new Error("Private key is not set in environment variables.");
    }

    // Load existing private key
    const key = new NodeRSA(privKey, "private", { encryptionScheme: "pkcs1",environment: "browser"  });

    // Decrypt the data
    const decryptedData = key.decrypt(encryptedData, "utf8");
  
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}