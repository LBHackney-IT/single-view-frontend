import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";

export const authoriseJigsawError = new Error("Error authorising with Jigsaw");

export const authoriseJigsaw = async (
  username: string,
  password: string
): Promise<string> => {
  // TODO: Use interface
  const data = {
    hashedUsername: username,
    hashedPassword: password,
  };

  const response = await axios.get(
    // TODO: Get the finalised endpoint
    `${process.env.SV_API_V1}/authorise?username=test`,
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
