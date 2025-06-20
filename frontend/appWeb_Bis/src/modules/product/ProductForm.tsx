import { Button, Form, Input, InputNumber } from "antd";
import React from "react";

function ProductForm() {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log("Datos del producto:", values);
  };

  return (
    <Form
      form={form}
      name="product"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
    >
      <h2>Formulario de Producto</h2>
      <Form.Item
        label="Nombre del producto"
        name="name"
        rules={[
          {
            required: true,
            message: "Por favor ingresa el nombre del producto",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Precio"
        name="price"
        rules={[{ required: true, message: "Por favor ingresa el precio" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Descripción" name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar Producto
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProductForm;
