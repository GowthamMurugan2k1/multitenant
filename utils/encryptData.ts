import NodeRSA from "node-rsa";

export async function encryptData(data: string) {
  const pubkey = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
  if (!pubkey) {
    return;
  }
  const key = new NodeRSA(pubkey, "public", { encryptionScheme: "pkcs1" });
  return key.encrypt(data, "base64"); // Encrypted data in base64 format
}

export const isErrorCode = [400,500,402,404]