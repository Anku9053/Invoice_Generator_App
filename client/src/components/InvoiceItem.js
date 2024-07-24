import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import FieldEdits from "./FieldEdits";

const InvoiceItem = ({ onItemizedItemEdit, currency, items, onRowDel, onRowAdd }) => {
  const handleDelEvent = (item) => {
    onRowDel(item);
  };

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onItemizedItemEdit={onItemizedItemEdit}
      onDelEvent={handleDelEvent}
      currency={currency}
    />
  ));

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ITEM</Th>
            <Th>QTY</Th>
            <Th>PRICE/RATE</Th>
            <Th textAlign="center">ACTION</Th>
          </Tr>
        </Thead>
        <Tbody>{itemTable}</Tbody>
      </Table>
      <Button colorScheme="blue" mt={4} onClick={onRowAdd}>
        Add Item
      </Button>
    </Box>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onDelEvent, currency }) => {
  const handleDelEvent = () => {
    onDelEvent(item);
  };

  return (
    <Tr>
      <Td>
        <FieldEdits
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
        />
        <FieldEdits
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id,
          }}
        />
      </Td>
      <Td>
        <FieldEdits
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </Td>
      <Td>
        <FieldEdits
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "right",
            value: item.price,
            id: item.id,
          }}
        />
      </Td>
      <Td textAlign="center">
        <Button
          onClick={handleDelEvent}
          colorScheme="red"
          variant="outline"
          size="sm"
        >
          <i className="fa-regular fa-trash-can"></i>
        </Button>
      </Td>
    </Tr>
  );
};

export default InvoiceItem;
