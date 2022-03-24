import { BehaviorSubject } from "rxjs";

import { config } from "@mtfh/common/lib/config";
import { axiosInstance } from "@mtfh/common/lib/http";

type Configuration = {
  configuration: Record<string, string | undefined>;
  featureToggles: Record<string, boolean | undefined>;
};
type ConfigCollection = Record<string, Configuration>;

type ConfigResponse = Array<Configuration & { type: string }>;

const initialConfiguration: ConfigCollection = {
  MMH: {
    configuration: {
      TestConfig: "",
    },
    featureToggles: {
      Test: false,
      EqualityDetails: false,
    },
  },
};

export const hydrateConfiguration = () => {
  try {
    const features = JSON.parse(
      window.localStorage.getItem("features") || "",
    ) as typeof initialConfiguration;

    if (typeof features === "object") {
      return features;
    }
    throw new Error("Invalid feature store in local storage");
  } catch (e) {
    if (localStorage.getItem("features")) {
      window.localStorage.removeItem("features");
    }
  }
  return {};
};

export const $configuration = new BehaviorSubject(hydrateConfiguration());

export const getConfiguration = async (): Promise<void> => {
  try {
    const res = await axiosInstance.get<ConfigResponse>(
      `${config.configurationApiUrlV1}/api/v1/configuration?types=MMH`,
    );
    res.data.forEach(({ type, featureToggles, configuration }) => {
      const configs = $configuration.getValue();
      $configuration.next({
        ...configs,
        [type]: {
          featureToggles,
          configuration,
        },
      });
    });
    window.localStorage.setItem("features", JSON.stringify($configuration.getValue()));
  } catch (e) {
    // TODO add logging for failed configuration
  }
};

const getAppConfig = (type: string): Configuration | null => {
  const configs = $configuration.getValue();
  const appConfig = configs[type];
  return appConfig || null;
};

export const getConfigItem = (path: string): string => {
  const [type, key] = path.split(".");
  const appConfig = getAppConfig(type);
  return appConfig?.configuration[key] || "";
};

export const getFeatureToggle = (path: string): boolean => {
  const [type, key] = path.split(".");
  const appConfig = getAppConfig(type);
  const value = appConfig?.featureToggles[key];
  return typeof value === "boolean" ? value : false;
};
