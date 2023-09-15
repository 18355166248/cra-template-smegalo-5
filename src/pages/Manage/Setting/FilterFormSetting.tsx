import { Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { ORDER_STATUS } from './constantSetting';
import { useIndexContext } from './Setting.context';

const FilterForm = () => {
  const [form] = Form.useForm();

  const { setState, pagination } = useIndexContext();

  useEffect(() => {
    form.setFieldsValue({
      select: [1],
    });
  }, []);

  function onFinish(values: any) {
    setState({
      filterForm: { ...values },
      pagination: {
        ...pagination,
        current: 1,
      },
    });
  }

  function onRest() {
    form.resetFields();
  }

  return (
    <Form
      form={form}
      labelCol={{ flex: '100px' }}
      wrapperCol={{ style: { maxWidth: 'calc(100% - 100px)' } }}
      layout="horizontal"
      onFinish={onFinish}
      style={{ marginLeft: -16 }}
    >
      <div className="flex flex-wrap">
        <div style={{ width: 300 }}>
          <Form.Item
            label="输入框"
            name="input"
            rules={[
              {
                required: true,
                message: '请输入',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div style={{ width: 300 }}>
          <Form.Item
            label="下拉框"
            name="select"
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          >
            <Select allowClear mode="multiple" maxTagCount="responsive">
              {Object.values(ORDER_STATUS).map(reson => (
                <Select.Option value={reson.value} key={reson.value}>
                  {reson.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex justify-end ml-10 mb-2">
          <Button htmlType="submit" type="primary" className="mr-2">
            查询
          </Button>
          <Button onClick={onRest}>重置</Button>
        </div>
      </div>
    </Form>
  );
};

export default FilterForm;
