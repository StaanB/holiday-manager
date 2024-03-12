import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag, Modal, Form, Input, Radio } from "antd";
import InputMask from "react-input-mask";
import type { TableProps } from "antd";
import { Requisition } from "../models/models";

// Function to define the color of the status tag
function handleReturnColor(status: string) {
  if (status === "pending") {
    return "yellow";
  } else if (status === "accepted") {
    return "green";
  } else {
    return "volcano";
  }
}

const AllRequisitions: React.FC = () => {
  // States for requisition, Modal and Row
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Requisition>(
    {} as Requisition
  );

  const [form] = Form.useForm();

  // Getting all holiday plans from API
  const getAllRequisitions = async () => {
    try {
      const response = await axios.get(
        "https://holiday-manager-api.vercel.app/requisitions"
      );
      return response.data.reverse();
    } catch (error) {
      console.error("Error fetching requisitions:", error);
      return [];
    }
  };

  // Watching API for changes, and after edit the plan
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRequisitions();
      setRequisitions(data);
    };

    fetchData();
  }, [editModalVisible]);

  // UpdateModal after edit
  useEffect(() => {
    form.setFieldsValue(selectedRowData);
  }, [selectedRowData]);

  // Open Modal to edit information
  const handleEdit = (record: Requisition) => {
    setSelectedRowData(record);
    setEditModalVisible(true);
  };

  // Save Modal with the new information
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `https://holiday-manager-api.vercel.app/requisitions/${selectedRowData.id}`,
        values
      );
      form.resetFields();
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating requisition:", error);
    }
  };

  // Delete plan in API
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://holiday-manager-api.vercel.app/requisitions/${id}`
      );
      const newData = requisitions.filter((item) => item.id !== id);
      setRequisitions(newData);
    } catch (error) {
      console.error("Error deleting requisition:", error);
    }
  };

  // Columns table configuration for Ant Design with responsivity
  const columns: TableProps<Requisition>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      responsive: ["md"],
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      render: (text) => <span>{text ? text : "None"}</span>,
      responsive: ["md"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Accepted", value: "accepted" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (
        <>
          <Tag color={handleReturnColor(status)} key={status}>
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Table with pagination */}
      <Table
        className="table-content"
        columns={columns}
        dataSource={requisitions}
        size="middle"
        pagination={{ position: ["bottomCenter"], defaultPageSize: 8 }}
        rowKey="id"
        locale={{
          emptyText:
            "We currently don't have any data, create one so it appears!",
        }}
      />
      {/* Modal for editing information */}
      <Modal
        title="Edit Item"
        open={editModalVisible}
        onOk={() => {
          if (selectedRowData) {
            handleSave();
          }
        }}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} initialValues={selectedRowData} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter a valid title", min: 5 },
            ]}
          >
            <Input name="titleInputModal" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter a valid description",
                min: 10,
              },
            ]}
          >
            <Input name="descriptionInputModal" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please enter a valid date" }]}
          >
            <InputMask
              name="dateInputModal"
              className="ant-input"
              mask="99/99/9999"
              maskChar=" "
            ></InputMask>
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: "Please enter valid a location",
                min: 3,
              },
            ]}
          >
            <Input name="locationInputModal" />
          </Form.Item>
          <Form.Item name="participants" label="Participants">
            <Input name="participantsInputModal" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="pending">Pending</Radio>
              <Radio value="rejected">Rejected</Radio>
              <Radio value="accepted">Accepted</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AllRequisitions;
