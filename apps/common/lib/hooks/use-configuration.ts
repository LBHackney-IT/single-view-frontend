import { useEffect, useState } from "react";

import { $configuration, getConfigItem } from "@mtfh/common/lib/configuration";

export const useConfiguration = (path: string): string => {
  const [config, setConfig] = useState(getConfigItem(path));

  useEffect(() => {
    const subscription = $configuration.subscribe(() => {
      setConfig(getConfigItem(path));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [path]);

  return config;
};
