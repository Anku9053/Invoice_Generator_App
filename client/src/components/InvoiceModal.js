import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Grid,
  GridItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

const InvoiceModal = (props) => {
  const {
    showModal,
    closeModal,
    info,
    currency,
    total,
    items,
    subTotal,
    taxAmount,
    discountAmount,
  } = props;

  const createInvoice = async () => {
    const invoiceData = {
        from: `${info.billFrom}\n${info.billFromAddress}\n${info.billFromEmail}\n${info.gstReg}\n${info.panNo}`,
        to: `${info.billTo}\n${info.billToAddress}\n${info.billToEmail}`,
        ship_to: `${info.shipTo}\n${info.shipToAddress}\n${info.shipToEmail}`,
        number: info.invoiceNumber,
        date: info.dateOfIssue || new Date().toISOString().split("T")[0],
        payment_terms: "NET 30",
        due_date: info.currentDate,
        items: items.map((item) => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unit_cost: item.price,
        })),
        fields: { tax: "%", discounts: false, shipping: false },
        discounts: discountAmount,
        tax: taxAmount,
        shipping: 0,
        amount_paid: 0,
        notes: info.notes,
        terms: "Terms and conditions go here...",
    };

    try {
        const response = await axios.post(
            "https://invoice-generator-qys7.onrender.com/api/create-invoice",  
            invoiceData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: "blob",
            }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error creating invoice:", error);
    }
};


  return (
    <Modal isOpen={showModal} onClose={closeModal} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box d="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              {info.billFrom || "John Uberbacher"}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              Invoice #: {info.invoiceNumber || ""}
            </Text>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Box mb={4} p={4} borderWidth="1px" borderRadius="md">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem>
                <Text fontWeight="bold">Billing Address:</Text>
                <Text>{info.billTo || ""}</Text>
                <Text>{info.billToAddress || ""}</Text>
                <Text>{info.billToEmail || ""}</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Sold By:</Text>
                <Text>{info.billFrom || ""}</Text>
                <Text>{info.billFromAddress || ""}</Text>
                <Text>{info.billFromEmail || ""}</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Date Of Issue:</Text>
                <Text>{info.dateOfIssue || ""}</Text>
              </GridItem>
            </Grid>
          </Box>
          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>QTY</Th>
                <Th>DESCRIPTION</Th>
                <Th textAlign="right">PRICE</Th>
                <Th textAlign="right">AMOUNT</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, i) => (
                <Tr key={i}>
                  <Td>{item.quantity}</Td>
                  <Td>{item.name} - {item.description}</Td>
                  <Td textAlign="right">{currency} {item.price}</Td>
                  <Td textAlign="right">{currency} {Math.floor(item.price * item.quantity)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td colSpan={2} />
                <Td fontWeight="bold">SUBTOTAL</Td>
                <Td textAlign="right">{currency} {subTotal}</Td>
              </Tr>
              {taxAmount !== 0.0 && (
                <Tr>
                  <Td colSpan={2} />
                  <Td fontWeight="bold">TAX</Td>
                  <Td textAlign="right">{currency} {taxAmount}</Td>
                </Tr>
              )}
              {discountAmount !== 0.0 && (
                <Tr>
                  <Td colSpan={2} />
                  <Td fontWeight="bold">DISCOUNT</Td>
                  <Td textAlign="right">{currency} {discountAmount}</Td>
                </Tr>
              )}
              <Tr>
                <Td colSpan={2} />
                <Td fontWeight="bold">TOTAL</Td>
                <Td textAlign="right">{currency} {total}</Td>
              </Tr>
            </Tbody>
          </Table>
          {info.notes && (
            <Box mt={4} p={4} bg="gray.100" borderRadius="md">
              {info.notes}
            </Box>
          )}
        </ModalBody>
        <ModalFooter>

          <Button variant="outline" onClick={createInvoice}>
            Download Copy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceModal;
