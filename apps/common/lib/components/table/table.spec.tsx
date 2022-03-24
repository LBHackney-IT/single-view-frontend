import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";

import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "./table";

const TableHeadSample = () => (
  <Thead>
    <Tr>
      <Th>Month you apply</Th>
      <Th>Rate for bicycles</Th>
      <Th>Rate for vehicles</Th>
    </Tr>
  </Thead>
);

const TableBodySample = () => (
  <Tbody>
    <Tr>
      <Td>January</Td>
      <Td isNumeric>£85</Td>
      <Td isNumeric>£95</Td>
    </Tr>
    <Tr>
      <Td>February</Td>
      <Td isNumeric>£75</Td>
      <Td isNumeric>£55</Td>
    </Tr>
    <Tr>
      <Td>March</Td>
      <Td isNumeric>£165</Td>
      <Td isNumeric>£125</Td>
    </Tr>
  </Tbody>
);

test("it displays a basic table passes a11y", async () => {
  const { container } = render(
    <Table>
      <TableBodySample />
    </Table>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it displays a custom styled basic table passes a11y", async () => {
  const tableClass = "customTableClass";
  const { container } = render(
    <Table className={tableClass}>
      <TableBodySample />
    </Table>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it displays a table with a header and passes a11y", async () => {
  const { container } = render(
    <Table>
      <TableHeadSample />
      <TableBodySample />
    </Table>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it displays a table with a caption and header and passes a11y", async () => {
  const { container } = render(
    <Table>
      <TableCaption>Caption 1: Months and rates</TableCaption>
      <TableHeadSample />
      <TableBodySample />
    </Table>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

const captionSizes = ["xlarge", "large", "medium", "small"];
captionSizes.map((size) =>
  test(`it displays a table with a ${size} caption and header and passes a11y`, async () => {
    const { container } = render(
      <Table>
        <TableCaption>{size} Caption 1: Months and rates</TableCaption>
        <TableHeadSample />
        <TableBodySample />
      </Table>,
    );
    expect(container).toMatchSnapshot();
    await testA11y(container);
  }),
);
