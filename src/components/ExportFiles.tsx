import React, { useEffect, useState } from "react";
import { Table, Button, message, TableProps } from "antd";
import { Requisition } from "../models/models";
import html2pdf from "html2pdf.js";
import axios from "axios";

const ExportFiles: React.FC = () => {
  // API consuming
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await axios.get(
          "https://holiday-manager-api.vercel.app/requisitions"
        );
        setRequisitions(response.data);
      } catch (error) {
        console.error("Error fetching requisitions:", error);
        message.error("Failed to fetch requisitions");
      }
    };
    fetchRequisitions();
  }, []);

  // Export PDF
  const handleExportPDF = async (item: Requisition) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>${item.title}</h1>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Date:</strong> ${item.date}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Participants:</strong> ${item.participants}</p>
        <p><strong>Status:</strong> ${item.status}</p>
      </div>
    `;

    // Export file
    html2pdf(element, {
      margin: 0.5,
      filename: `${item.title}.pdf`,
      jsPDF: { format: "a4", orientation: "portrait" },
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true },
      onComplete: () => {
        message.success("Successfully exported as PDF");
      },
    });
  };

  const columns: TableProps<Requisition>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Requisition) => (
        <Button onClick={() => handleExportPDF(record)}>Export PDF</Button>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={requisitions}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ExportFiles;
