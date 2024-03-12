import React from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

const CreateRequisition: React.FC = () => {
  const [form] = Form.useForm();

  // Disabling previous dates for DatePicker
  const disabledDate = (current: Dayjs | null) => {
    return current ? current.isBefore(dayjs(), "day") : false;
  };

  // Adding holiday plans in API
  const handleAddRequisition = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        participants: values.participants || null,
        date: values.date.format("MM/DD/YYYY"),
        status: "pending",
      };

      const response = await axios.post(
        "https://holiday-manager-api.vercel.app/requisitions",
        formattedValues
      );

      console.log(response.status);
      message.success("Requisition added successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error adding requisition:", error);
      message.error("Failed to add requisition");
    }
  };

  return (
    // Form with Ant Desing
    <Form
      form={form}
      onFinish={handleAddRequisition}
      layout="vertical"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter a title" }]}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Input placeholder="Title" name="titleInput" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter a description" }]}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Input placeholder="Description" name="descriptionInput" />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please enter a date" }]}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <DatePicker
          format="MM/DD/YYYY"
          style={{ width: "100%" }}
          disabledDate={disabledDate}
          name="dateInput"
        />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: "Please enter a location" }]}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Input placeholder="Location" name="locationInput"/>
      </Form.Item>
      <Form.Item
        name="participants"
        label="Participants (optional)"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Input placeholder="Participants" name="participantsInput"/>
      </Form.Item>
      <Form.Item style={{ width: "100%", maxWidth: "400px" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRequisition;
