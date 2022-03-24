import { useEffect, useState } from "react";

import { $configuration, getFeatureToggle } from "@mtfh/common/lib/configuration";

export const useFeatureToggle = (path: string): boolean => {
  const [toggle, setToggle] = useState(getFeatureToggle(path));

  useEffect(() => {
    const subscription = $configuration.subscribe(() => {
      setToggle(getFeatureToggle(path));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [path]);

  return toggle;
};
