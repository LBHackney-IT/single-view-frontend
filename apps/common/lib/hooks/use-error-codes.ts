import { useEffect, useState } from "react";

import { useReferenceData } from "@mtfh/common/lib/api/reference-data/v1";

import locale from "../locale";

const { hooks } = locale;
const { defaultErrorMessages } = hooks;
interface ErrorMessages {
  [key: string]: string;
}

export const useErrorCodes = () => {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(defaultErrorMessages);

  const { data, error } = useReferenceData<"mmh">({
    category: "error-code",
    subCategory: "mmh",
  });

  useEffect(() => {
    if (data?.mmh) {
      const fromErr = data?.mmh.reduce((acc, obj) => {
        acc[obj.code] = obj.value;
        return acc;
      }, {} as Record<string, string>);

      const mergedErrors = { ...defaultErrorMessages, ...fromErr };
      setErrorMessages(mergedErrors);
    }
  }, [data]);

  if (!data && !error) {
    return null;
  }

  return errorMessages;
};
