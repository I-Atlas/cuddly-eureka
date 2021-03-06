import { Box, Icon, Button, Spinner } from "@chakra-ui/react";

import { FiDownload, FiEyeOff } from "react-icons/fi";

import { Table } from "react-chakra-pagination";
import { useState } from "react";
import useFetch from "use-http";
import { Section } from "./section";

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

interface IPaymentList {
  payments: IPayment[];
  totalPage: number;
  currentPage: number;
}

export default function PaymentList() {
  // Control current Page
  const [page, setPage] = useState(1);

  const {
    loading,
    error,
    data: payments,
  } = useFetch<IPaymentList>(
    `/payment?page=${page}&perPage=10`,
    {
      // onNewData: (currDocs, newDocs) => [...currDocs, ...newDocs],
      data: [],
    },
    [page]
  ); // onMount AND onUpdate whenever `page` changes

  // const onSubmit = async (data) => {
  //   const payments = Array.from(data.payments);
  //   const returnRequests = Array.from(data.returnRequests);
  //   const formData = new FormData();
  //   payments.forEach(async (file) => {
  //     formData.append("payments", file);
  //   });
  //   returnRequests.forEach(async (file) => {
  //     formData.append("returnRequests", file);
  //   });

  //   await post(formData);
  //   if (!response.ok || error) {
  //     toast({
  //       title: "Ошибка",
  //       description:
  //         "Ой, что-то пошло не так! Попробуйте еще раз или повторите попытку позднее",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //       variant: "solid",
  //     });
  //   } else if (response.ok) {
  //     const blob = await response.blob();
  //     const fileName = response.headers.get("Content-Disposition")?.split('filename=')[1].split(';')[0];;
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = fileName ?? 'Report';
  //     link.click();
  //     toast({
  //       title: "Файлы успешно загружены",
  //       description: "Вы успешно загрузили файлы",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //       variant: "solid",
  //     });
  //   }
  // };

  // Formatter for each user
  const tableData = (payments?.payments ?? []).map((payment) => {
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
        <a href={`http://localhost:9000/payment/${documentNumber}/report`}>
          <Icon as={FiDownload} fontSize="20" />
        </a>
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
    <Section id="payments" innerWidth={1280} position="relative">
      <Box w={"full"} overflow="auto" mt="6">
        {loading && <Spinner size={"xl"} />}
        {error && "Error"}
        {payments?.payments && (
          <Table
            colorScheme="blue"
            // Fallback component when list is empty
            emptyData={{
              icon: FiEyeOff,
              text: "Ничего не найдено",
            }}
            totalRegisters={payments.payments.length ?? 0}
            page={page}
            // Listen change page event and control the current page using state
            onPageChange={(page) => setPage(page)}
            columns={tableColumns}
            data={tableData}
          />
        )}
      </Box>
    </Section>
  );
}
