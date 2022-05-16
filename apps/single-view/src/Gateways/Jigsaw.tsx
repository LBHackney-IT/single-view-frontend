import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { encrypt } from "../Utils/security";

export const authoriseJigsawError = new Error("Error authorising with Jigsaw");

export const authoriseJigsaw = async (
  username: string,
  password: string
): Promise<string> => {
  // TODO: Use interface
  const data = {
    username: username,
    password: password,
  };

  const key = process.env.AES_KEY || "key";
  const iv = process.env.AES_IV || "iv";

  const encryptedCreds = encrypt(JSON.stringify(data), key, iv);

  const response = await axios.post(
    `${process.env.SV_API_V1}/api/v1/storeCredentials`,
    { encryptedCredentials: encryptedCreds },
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );

  if (response.status != 200) {
    throw authoriseJigsawError;
  }

  return response.data;
};
