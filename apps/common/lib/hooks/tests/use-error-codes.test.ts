import {
  generateMockReferenceDataV1,
  getReferenceDataV1,
  server,
} from "@hackney/mtfh-test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { useErrorCodes } from "../use-error-codes";

describe("useErrorCodes", () => {
  test("it makes a call to the referenceData API for error codes and returns them correctly", async () => {
    const errorRefData = Array.from({ length: 3 }).map((_, index) =>
      generateMockReferenceDataV1({
        category: "error-code",
        subCategory: "mmh",
        code: `W${index + 1}`,
        value: `W${index + 1}Text_Test`,
      }),
    );
    server.use(getReferenceDataV1(errorRefData));

    const { result, waitForNextUpdate } = renderHook(() => useErrorCodes());
    expect(result.current).toBe(null);
    await waitForNextUpdate();

    expect(result.current?.W1).toStrictEqual("W1Text_Test");
    expect(result.current?.W2).toStrictEqual("W2Text_Test");
    expect(result.current?.W3).toStrictEqual("W3Text_Test");

    // W4 defaults to hardcoded error as reference data does not return a message for W4
    expect(result.current?.W4).toStrictEqual("You must select an option to proceed");
  });
});
