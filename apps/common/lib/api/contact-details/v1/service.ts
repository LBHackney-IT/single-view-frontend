import { config } from "@mtfh/common/lib/config";
import { axiosInstance } from "@mtfh/common/lib/http";

export const deleteContactDetail = async (
  id: string,
  targetId: string,
): Promise<void> => {
  const response = await axiosInstance.delete(
    `${config.contactDetailsApiUrlV1}/contactDetails?id=${id}&targetId=${targetId}`,
  );
  return response.data;
};
