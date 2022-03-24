import { entityDiff } from "./entity-diff";

test("it returns only diff", () => {
  const diff = entityDiff(
    { name: "John", surname: "Smith" },
    { name: "James", surname: "Smith" },
  );
  expect(diff).toStrictEqual({ name: "James" });
});

test("it returns only top level differences", () => {
  const diff = entityDiff(
    {
      name: "John",
      address: { street: "Electric Avenue", postcode: "AEX1234" },
    },
    {
      name: "John",
      address: { street: "Electric Avenue", postcode: "EC132F6" },
    },
  );
  expect(diff).toStrictEqual({
    address: { street: "Electric Avenue", postcode: "EC132F6" },
  });
});

test("it returns sets removed items to null", () => {
  const diff = entityDiff(
    {
      name: "John",
      address: { street: "Electric Avenue", postcode: "AEX1234" },
    },
    {
      surname: "Smith",
    },
  );
  expect(diff).toStrictEqual({
    name: null,
    address: null,
    surname: "Smith",
  });
});

test("it returns an empty object when comparing empty objects", () => {
  const diff = entityDiff({}, {});
  expect(diff).toStrictEqual({});
});
