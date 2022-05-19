import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { encrypt } from "../Utils/security";
import { JigsawCredentials } from "../Interfaces/jigsawInterfaces";

export const authoriseJigsawError = new Error("Error authorising with Jigsaw");

export const authoriseJigsaw = async (
  username: string,
  password: string
): Promise<string> => {
  const key = process.env.AES_KEY || "keykeykeykeykeykeykeykeykeykeyke"; // 32 bytes /
  const iv = process.env.AES_IV || "iviviviviviviviv"; // 16 bytes
  const jigsawCredentials: JigsawCredentials = {
    username: username,
    password: password,
  };
  const encryptedCreds = encrypt(JSON.stringify(jigsawCredentials), key, iv);

  const response = await axios.post(
    `${process.env.SV_API_V1}/storeCredentials`,
    encryptedCreds,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );

  if (response.status != 200) {
    throw authoriseJigsawError;
  }

  return response.data;
};
