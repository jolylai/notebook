import { Alert, Space } from 'antd';

export default function AlertColor() {
  return (
    <Space>
      <Alert message="Success Text" type="success" />
      <Alert message="Info Text" type="info" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />
    </Space>
  );
}
