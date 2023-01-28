import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, Input, Select } from 'antd';
import styles from '../style.less';
import ProgramService from '../program';

const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const OperationModal = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [video, setVideo] = useState("");
  const [okok, setOkok] = useState(false);

  useEffect(() => {
    setOkok(false);
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
      setName(current.name);
      setLabel(current.label);
      setVideo(current.video);
    }
  }, [props.current]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || label === "" || video === "") {
      window.alert("You must be fill in all required fields!!");
    } else if (video.indexOf("youtu.be") > -1) {
      window.alert("Your link is in wrong format!!");
    } else if (video.indexOf("youtube") < 0) {
      window.alert("Your video link must be on Youtube!!");
    } else {
      if (current) {
        ProgramService.updateVideo(
          current.id,
          name,
          label,
          video);
        setOkok(true);
      } else {
        ProgramService.saveVideo(
          name,
          label,
          video);
        setName("");
        setLabel("");
        setVideo("");
        setOkok(true);
      }
    }

  };

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeVideo = (e) => {
    setVideo(e.target.value);
  }

  const onChangeLabel = (e) => {
    setLabel(e);
  }

  const modalFooter = done
    ? {
      footer: null,
      onCancel: onDone,
    }
    : {
      okText: current ? ("Update") : ("Add"),
      onOk: handleSubmit,
      onCancel,
    };

  const getModalContent = () => {
    if (okok) {
      return (
        <Result
          status="success"
          title="Success"
          subTitle={current ? ("Update successfully") : ("Video added successfully")}
          extra={
            <Button type="primary" onClick={onDone}>
              Complete
            </Button>
          }
          className={styles.formResult}
        />
      );
    }

    return (
      <Form {...formLayout} form={form} onSubmit={handleSubmit}>
        <Form.Item
          name="name"
          label="Workout Name"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input onChange={onChangeName} />
        </Form.Item>
        <Form.Item
          name="label"
          label="Label"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Select onChange={onChangeLabel} disabled={current ? (true) : (false)}>
            <Select.Option value="Chest">Chest</Select.Option>
            <Select.Option value="Shoulder">Shoulder</Select.Option>
            <Select.Option value="Back">Back</Select.Option>
            <Select.Option value="Arm">Arm</Select.Option>
            <Select.Option value="Leg">Leg</Select.Option>
            <Select.Option value="Abs">Abs</Select.Option>
            <Select.Option value="Burn fat">Burn Fat</Select.Option>
            <Select.Option value="Gain Weight">Gain Weight</Select.Option>
            <Select.Option value="Build Muscle">Build Muscle</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="video"
          label="Video"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input onChange={onChangeVideo} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
            padding: '72px 0',
          }
          : {
            padding: '28px 0 0',
          }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
