import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, Input, Select } from 'antd';
import styles from '../style.less';
import ProdService from '../ProdService';
import { uniqBy } from 'lodash';

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
  const [category, setCategory] = useState("");
  const [productname, setProductname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(undefined);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
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
      setProductname(current.productname);
      setDescription(current.description);
      setPrice(current.price);
      setImage1(current.image1);
      setImage2(current.image2);
      setImage3(current.image3);
      setImage4(current.image4);
    }
  }, [props.current]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current ? (undefined) : (category === "") || productname  === "" || price === "" || image1  === "" || description  === "") {
      window.alert("You must be fill in all required fields!!");
    } else if (description.length > 2000) {
      window.alert("Description must be under 2000 characters!");
    } else {
      if (current) {
        ProdService.updateProd(
          current.id,
          current.category,
          productname,
          description,
          price,
          100,
          image1,
          image2,
          image3,
          image4);
        setOkok(true);
      } else {
        ProdService.saveProd(
          category,
          productname,
          description,
          price,
          100,
          image1,
          image2,
          image3,
          image4);
        setCategory("");
        setProductname("");
        setDescription("");
        setPrice("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setOkok(true);
      }
    }
  };

  const onChangeCategory = (e) => {
    setCategory(e);
  }

  const onChangeProdName = (e) => {
    setProductname(e.target.value);
  }

  const onChangeDesc = (e) => {
    setDescription(e.target.value);
  }

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const onChangeImage1 = (e) => {
    setImage1(e.target.value);
  }

  const onChangeImage2 = (e) => {
    setImage2(e.target.value);
  }

  const onChangeImage3 = (e) => {
    setImage3(e.target.value);
  }

  const onChangeImage4 = (e) => {
    setImage4(e.target.value);
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
          subTitle={current ? ("Update successfully") : ("Product added successfully")}
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
          name="prodname"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input onChange={onChangeProdName} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea class="form-control" wrap="hard" rows={4} onChange={onChangeDesc} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input type="number" onChange={onChangePrice} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Select onSelect={onChangeCategory} disabled={current ? (true) : (false)}>
            <Select.Option value="supplement">Supplements</Select.Option>
            <Select.Option value="apparel">Apparel</Select.Option>
            <Select.Option value="accessories">Accessories</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="image1"
          label="Image1"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input onChange={onChangeImage1} />
        </Form.Item>
        <Form.Item
          name="image2"
          label="Image2"
        >
          <Input onChange={onChangeImage2} />
        </Form.Item>
        <Form.Item
          name="image3"
          label="Image3"
        >
          <Input onChange={onChangeImage3} />
        </Form.Item>
        <Form.Item
          name="image4"
          label="Image4"
        >
          <Input onChange={onChangeImage4} />
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
