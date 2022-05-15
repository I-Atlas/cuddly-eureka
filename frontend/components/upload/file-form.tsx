import { Section } from "components/section";
import { FileItem } from "./file-item";

export const FileForm = () => {
  const data = [
    { title: "платежные поручения", endpoint: "payment" },
    { title: "заявки на возврат", endpoint: "vozvrat" },
  ];

  return (
    <Section innerWidth="xl" id="upload-docs" position="relative">
      {data.map((item, index) => (
        <FileItem key={index} title={item.title} endpoint={item.endpoint} />
      ))}
    </Section>
  );
};
