import {
  Flex,
  Avatar,
  Text,
  Box,
  Icon,
  Button,
  Heading,
  Spinner,
} from "@chakra-ui/react";

import { FiDownload, FiEyeOff } from "react-icons/fi";

import { Table } from "react-chakra-pagination";
import { useState } from "react";
import useFetch from "use-http";

export interface IPayment {
  documentNumber: string;
  date: string;
  amount: string;
  payer: string;
  payerINN: string;
  payerKPP: string;
  payerAccount: string;
  payerBic: string;
  payerCorr: string;
  receiver: string;
  receiverINN: string;
  receiverKPP: string;
  receiverAccount: string;
  receiverBic: string;
  receiverCorr: string;
}

export default function PaymentList() {
  // Control current Page
  const [page, setPage] = useState(1);

  const {
    loading,
    error,
    data: payments,
  } = useFetch<IPayment[]>(
    `/payment?page=${page}&perPage=10`,
    {
      onNewData: (currDocs, newDocs) => [...currDocs, ...newDocs],
      data: [],
    },
    [page],
  ); // onMount AND onUpdate whenever `page` changes

  // Formatter for each user
  const tableData = (payments ?? []).map((payment) => {
    const {
      documentNumber,
      date,
      amount,
      payer,
      payerINN,
      payerKPP,
      payerAccount,
      payerBic,
      payerCorr,
      receiver,
      receiverINN,
      receiverAccount,
      receiverBic,
      receiverCorr,
      receiverKPP,
    } = payment;
    return {
      documentNumber,
      date,
      amount,
      payer,
      payerINN,
      payerKPP,
      payerAccount,
      payerBic,
      payerCorr,
      receiver,
      receiverINN,
      receiverKPP,
      receiverAccount,
      receiverBic,
      receiverCorr,
      action: (
        <Button
          colorScheme="gray"
          onClick={() => console.log("download")}
          size="sm"
        >
          <Icon as={FiDownload} fontSize="20" />
        </Button>
      ),
    };
  });

  // Accessor to get a data in user object
  const tableColumns = [
    {
      Header: "№ документа",
      accessor: "documentNumber" as const,
    },
    {
      Header: "Дата",
      accessor: "date" as const,
    },
    {
      Header: "Сумма",
      accessor: "amount" as const,
    },
    {
      Header: "Плательщик",
      accessor: "payer" as const,
    },
    {
      Header: "ИНН плательщика",
      accessor: "payerINN" as const,
    },
    {
      Header: "КПП Плательщика",
      accessor: "payerKPP" as const,
    },
    {
      Header: "Расч Сч. N плательщика",
      accessor: "payerAccount" as const,
    },
    {
      Header: "БИК банка плательщика",
      accessor: "payerBic" as const,
    },
    {
      Header: "Кор Сч. N банка плательщика",
      accessor: "payerCorr" as const,
    },
    {
      Header: "Получатель",
      accessor: "receiver" as const,
    },
    {
      Header: "ИНН получателя",
      accessor: "receiverINN" as const,
    },
    {
      Header: "КПП Получателя",
      accessor: "receiverKPP" as const,
    },
    {
      Header: "Расч Сч. N Получателя",
      accessor: "receiverAccount" as const,
    },
    {
      Header: "БИК банка Получателя",
      accessor: "receiverBic" as const,
    },
    {
      Header: "Кор Сч. N банка Получателя",
      accessor: "receiverCorr" as const,
    },
    {
      Header: "",
      accessor: "action" as const,
    },
  ];

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        Платежные поручения
      </Heading>

      <Box mt="6">
        {loading && <Spinner size={"xl"} />}
        {error && "Error"}
        {payments && (
          <Table
            colorScheme="blue"
            // Fallback component when list is empty
            emptyData={{
              icon: FiEyeOff,
              text: "Ничего не найдено",
            }}
            totalRegisters={payments?.length ?? 0}
            page={page}
            // Listen change page event and control the current page using state
            onPageChange={(page) => setPage(page)}
            columns={tableColumns}
            data={tableData}
          />
        )}
      </Box>
    </Box>
  );
}
