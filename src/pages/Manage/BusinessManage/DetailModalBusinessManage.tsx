import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import { useIndexContext } from "./BusinessManage.context";
import {
  createInvoicedOrder,
  updateInvoicedOrder,
} from "@/services/invoiceOrder";

interface Props {}

interface PropsRef {}

const DetailModal = forwardRef<PropsRef, Props>((_props, ref) => {
  const {
    setState,
    modalVisible: visible,
    modalData,
    modalType,
    getList,
  } = useIndexContext();

  const formDisabled = modalType === "detail";

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(modalData);
    } else {
      form.resetFields();
    }
  }, [visible, modalData]);

  function onCancel() {
    setState({
      modalVisible: false,
    });
  }

  function submitHandle(formData: any) {
    const title =
      modalType === "add" ? "新增" : modalType === "edit" ? "编辑" : "";
    setLoading(true);
    const requestMethod =
      modalType === "add" ? createInvoicedOrder : updateInvoicedOrder;
    if (modalData.id) {
      formData.id = modalData.id;
    }
    requestMethod(formData)
      .then(() => {
        notification.success({ message: `${title}成功！` });
        onCancel();
        getList();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      title="弹窗标题"
      footer={null}
      open={visible}
      onCancel={onCancel}
      width={600}
    >
      <Form form={form} onFinish={submitHandle}>
        <Form.Item
          label="表单1"
          name="input1"
          rules={[
            {
              required: true,
              type: "integer",
              message: "该值必须为整数",
              transform(value) {
                if (value) {
                  return Number(value);
                }
              },
            },
          ]}
        >
          <Input disabled={formDisabled} />
        </Form.Item>
        {modalType !== "detail" && (
          <div className="flex justify-end mt-10">
            <Button onClick={onCancel} className="mr-3">
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              确定
            </Button>
          </div>
        )}
      </Form>
    </Modal>
  );
});

export default DetailModal;
