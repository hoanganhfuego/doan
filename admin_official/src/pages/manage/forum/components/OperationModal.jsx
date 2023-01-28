import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, Input, Select } from 'antd';
import styles from '../style.less';
import ForumService from '../ForumService';

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
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
      setTitle(current.title);
      setDescription(current.description);
      setContent(current.content);
      setVideo(current.video);
    }
  }, [props.current]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || content === "" || description === "" || video === "") {
      window.alert("You must be fill in all required fields!!");
    } else if(description.length > 150){
      window.alert("Description must be under 150 characters!");
    } else if (video.indexOf("youtube") < 0) {
      window.alert("Your video link must be on Youtube!!");
    } else {
      if (current) {
        ForumService.updateForum(
          current.postid,
          content,
          description,
          title,
          video);
        setOkok(true);
      } else {
        ForumService.addForum(
          content,
          description,
          title,
          video);
        setTitle("");
        setDescription("");
        setContent("");
        setVideo("");
        setOkok(true);
      }
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeVideo = (e) => {
    setVideo(e.target.value);
  }

  const onChangeDesc = (e) => {
    setDescription(e.target.value);
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
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
          subTitle={current ? ("Update successfully") : ("Forum added successfully")}
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
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input onChange={onChangeTitle} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input onChange={onChangeDesc} />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <TextArea class="form-control" wrap="hard" rows={4} onChange={onChangeContent} />
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
