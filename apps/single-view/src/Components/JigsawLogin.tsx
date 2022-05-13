import React, { useState } from "react";
import { authoriseJigsaw } from "../Gateways/Jigsaw";
import { decrypt } from "../Utils/security";

export const JigsawLogin = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = async (): Promise<string | void> => {
    if (username && password) {
      return await authoriseJigsaw(username, password);
    }
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Promise.resolve(login()).then((res) => {
      console.log(res);
      console.log(decrypt(res || ""));
    });
  };

  const dismiss = () => {
    console.log("dismissed");
  };

  return (
    <>
      <form action="" onSubmit={(e) => submit(e)}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={dismiss}>
          Dismiss
        </button>
      </form>
    </>
  );
};
