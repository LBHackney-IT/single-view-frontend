import axios from "axios";
import { getToken, encrypt, isNotLocal } from "../Utils";
import { JigsawCredentials } from "../Interfaces";

export const authoriseJigsawError = new Error("Error authorising with Jigsaw");

export const authoriseJigsaw = async (
  username: string,
  password: string
): Promise<string> => {
  const key = process.env.RSA_PUBLIC_KEY || "keykeykeykeykeykeykeykeykeykeyke"; // 32 bytes
  const jigsawCredentials: JigsawCredentials = {
    username: username,
    password: password,
  };
  const encryptedCreds = encrypt(JSON.stringify(jigsawCredentials), key);

  if (isNotLocal()) {
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
  } else {
    return "Placeholder-Jigsaw-Token";
  }
};
