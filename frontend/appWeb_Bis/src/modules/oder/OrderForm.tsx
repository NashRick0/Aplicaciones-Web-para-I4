import { Button, Form, Input, InputNumber, DatePicker } from "antd";
import React from "react";

function OrderForm() {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log("Datos de la orden:", values);
  };

  return (
    <Form
      form={form}
      name="order"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
    >
      <h2>Formulario de Orden</h2>
      <Form.Item
        label="ID del producto"
        name="productId"
        rules={[
          { required: true, message: "Por favor ingresa el ID del producto" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cantidad"
        name="quantity"
        rules={[{ required: true, message: "Por favor ingresa la cantidad" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Fecha de la orden"
        name="orderDate"
        rules={[{ required: true, message: "Por favor selecciona la fecha" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar Orden
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OrderForm;
