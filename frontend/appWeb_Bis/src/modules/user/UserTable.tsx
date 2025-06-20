import { Table } from 'antd';
import React from 'react';

type User = {
  key: string;
  username: string;
  email: string;
  role: string;
};

const UserTable: React.FC = () => {
  // Datos de ejemplo para la tabla
  const data: User[] = [
    {
      key: '1',
      username: 'usuario1',
      email: 'usuario1@example.com',
      role: 'Admin',
    },
    {
      key: '2',
      username: 'usuario2',
      email: 'usuario2@example.com',
      role: 'Usuario',
    },
    {
      key: '3',
      username: 'usuario3',
      email: 'usuario3@example.com',
      role: 'Usuario',
    },
  ];

  // Definición de columnas
  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default UserTable;
