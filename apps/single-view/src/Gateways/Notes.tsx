import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { Note } from "../Interfaces";
import { $auth } from "@mfe/common/lib/auth";
import { SystemId } from "../Interfaces/systemIdInterface";

export const getNotesError = new Error("Error retrieving notes");
export const createNoteError = new Error("Error creating note");

export const getNotes = async (
  systemIds: Array<SystemId>,
  jigsawToken: string | null
): Promise<Note[]> => {
  let url = `${process.env.SV_API_V1}/notes?systemIds=${JSON.stringify(
    systemIds
  )}`;
  if (jigsawToken) {
    console.log("Getting jigsaw notes...");
    url += `&redisId=${jigsawToken}`;
  }

  const response = await axios.get(encodeURI(url), {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  if (response.status != 200) {
    throw getNotesError;
  }

  console.log(response.data.notes);

  return response.data.notes;
};

export const createNote = async (
  targetId: string,
  data: any
): Promise<Note> => {
  let auth = $auth.getValue();
  let note: Note = Object.assign(
    {
      id: "",
      targetId: targetId,
      highlight: false,
      title: null,
      description: "",
      createdAt: new Date().toISOString(),
      categorisation: {
        category: "",
        subCategory: "",
        description: "",
      },
      targetType: "person",
      author: {
        fullName: auth.name,
        email: auth.email,
      },
    },
    data
  );

  const response = await axios.post(`${process.env.SV_API_V1}/notes`, note, {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  if (response.status != 201) {
    throw createNoteError;
  }

  return response.data;
};
