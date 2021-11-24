import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import { message, Space } from "antd";
import axios from "axios";

export const MemberModel = (props: {
  isModalVisible: boolean;
  closeModel: any;
  getList: any;
  curRow: any;
}) => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const { Option } = Select;
  const validateMessages = {
    // 非空验证
    required: "${label} is required!",
    // 邮箱、数字验证
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    // 数字大小区域验证
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  useEffect(() => {
    // 请求列表
    setData();
  }, [props.isModalVisible]);

  // 关闭弹窗
  const handleOk = () => {
    props.closeModel();
  };
  // 关闭弹窗
  const handleCancel = () => {
    props.closeModel();
    onReset();
  };
  // 重置
  const onReset = () => {
    form.resetFields();
  };
  // 修改赋值
  const setData = () => {
    form.setFieldsValue({ ...props.curRow });
  };

  // 提交
  const onFinish = (values: any) => {
    console.log(values);
    axios
      .post("http://localhost:3000/member/save", values.member)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          message.success(res.msg);
          handleCancel();
          props.getList();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      title="添加成员"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...layout}
        form={form}
        name="member"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["member", "name"]}
          label="尊姓大名"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["member", "nickname"]} label="别号">
          <Input />
        </Form.Item>
        <Form.Item
          name={["member", "sex"]}
          label="男女"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["member", "birthday"]} label="生辰">
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={["member", "life"]}
          label="生死"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value={1}>生</Option>
            <Option value={2}>死</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["member", "zodiac"]} label="生肖">
          <Select>
            <Option value="鼠">子（鼠）</Option>
            <Option value="牛">丑（牛）</Option>
            <Option value="虎">寅（虎）</Option>
            <Option value="兔">卯（兔）</Option>
            <Option value="龙">辰（龙）</Option>
            <Option value="蛇">巳（蛇）</Option>
            <Option value="马">午（马）</Option>
            <Option value="羊">未（羊）</Option>
            <Option value="猴">申（猴）</Option>
            <Option value="鸡">酉（鸡）</Option>
            <Option value="狗">戌（狗）</Option>
            <Option value="猪">亥（猪）</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["member", "constellation"]} label="星座">
          <Select>
            <Option value="白羊座">白羊座</Option>
            <Option value="金牛座">金牛座</Option>
            <Option value="双子座">双子座</Option>
            <Option value="巨蟹座">巨蟹座</Option>
            <Option value="狮子座">狮子座</Option>
            <Option value="处女座">处女座</Option>
            <Option value="天秤座">天秤座</Option>
            <Option value="天蝎座">天蝎座</Option>
            <Option value="射手座">射手座</Option>
            <Option value="摩羯座">摩羯座</Option>
            <Option value="水瓶座">水瓶座</Option>
            <Option value="双鱼座">双鱼座</Option>
          </Select>
        </Form.Item>
        <Form.Item name={["member", "occupation"]} label="行当">
          <Input />
        </Form.Item>
        <Form.Item name={["member", "interest"]} label="志趣">
          <Input />
        </Form.Item>
        <Form.Item name={["member", "contact"]} label="通讯">
          <Input />
        </Form.Item>
        <Form.Item name={["member", "intro"]} label="述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
