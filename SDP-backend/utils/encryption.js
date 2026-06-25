/**
 * AES-256-GCM field-level encryption utility
 * Used to encrypt sensitive patient PII before storing in MongoDB.
 *
 * Requires ENCRYPTION_KEY in .env — a 64-char hex string (32 bytes).
 * Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;   // 128-bit IV
const TAG_LENGTH = 16;  // 128-bit auth tag

function getKey() {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY must be set in .env as a 64-character hex string (32 bytes)"
    );
  }
  return Buffer.from(keyHex, "hex");
}

/**
 * Encrypt a plaintext string.
 * Returns a colon-separated string: iv:authTag:ciphertext (all hex-encoded)
 */
export function encrypt(plaintext) {
  if (plaintext === undefined || plaintext === null || plaintext === "") {
    return plaintext;
  }
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(String(plaintext), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Decrypt a value produced by encrypt().
 * Returns the original plaintext string.
 */
export function decrypt(encryptedValue) {
  if (!encryptedValue || typeof encryptedValue !== "string") {
    return encryptedValue;
  }

  // If the value doesn't look like an encrypted blob, return as-is
  // (handles legacy plain-text records gracefully)
  const parts = encryptedValue.split(":");
  if (parts.length !== 3) {
    return encryptedValue;
  }

  try {
    const key = getKey();
    const [ivHex, tagHex, ciphertextHex] = parts;

    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const ciphertext = Buffer.from(ciphertextHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch {
    // Return raw value if decryption fails (e.g. wrong key, corrupted data)
    return encryptedValue;
  }
}
