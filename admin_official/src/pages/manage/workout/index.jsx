import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import {
  Button,
  Card,
  Col,
  List,
  Modal,
  Row,
} from 'antd';
import { findDOMNode } from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import OperationModal from './components/OperationModal';
import styles from './style.less';
import ProgramService from './program';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const CardList = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    listAndbasicList: { list },
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [videos, setVideo] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(undefined);
  const [totalElements, setTotalElements] = useState(undefined);
  const [search, setSearch] = useState("");
  const [countForum, setCountForum] = useState(0);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    getVideo(currentPage);
  }, []);

  var searchVideo = async (currentPage) => {
    if (search) {
      setCurrentPage(currentPage -= 1);
      var product = await ProgramService.searchVideo(search + "?page=" + currentPage + "&size=" + itemPerPage);
      await setVideo(product.data.content)
      await setTotalPages(product.data.totalPages)
      await setTotalElements(product.data.totalElements);
      await setCurrentPage(product.data.number + 1);
    } else {
      getVideo(currentPage);
    }
  }

  var getVideo = async (currentPage) => {
    setCurrentPage(currentPage -= 1);
    var video = await ProgramService.getVideo("?page=" + currentPage + "&size=" + itemPerPage);
    await setVideo(video.data.content)
    await setTotalPages(video.data.totalPages)
    await setTotalElements(video.data.totalElements);
    await setCurrentPage(video.data.number + 1);
  }

  const handlePageChange = (event, value) => {
    if (search) {
      searchVideo(value);
    } else {
      getVideo(value);
    }
  }

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id) => {
    ProgramService.deleteVideo(id);
    setTimeout(() => {getVideo(currentPage);}, 250);
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <div className='searchbar'>
        <div className="input-group rounded">
          <input type="search" class="form-control rounded" placeholder="Search....." aria-label="Search"
            aria-describedby="search-addon" id="search-input" onChange={onChangeSearch} />
          <span class="input-group-text border-0 noborder" id="search-addon">
            <button className='search-links' id="search-button" onClick={() => { searchVideo(currentPage) }}>
              <i class="fas fa-search"></i>Search
              </button>
          </span>
        </div>
      </div>
    </div>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current);
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
    getVideo(currentPage);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values) => {
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'listAndbasicList/submit',
      payload: { ...values },
    });
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={24} xs={24}>
                <Info title="Workout Count" value={totalElements} bordered />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Workout List"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8,
              }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              Add Workout
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
            >
              {
                videos.map(
                  item => (
                    <List.Item
                      actions={[
                        <a
                          key="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            showEditModal(item);
                          }}
                        >
                          Edit
                    </a>,
                        <a
                          key="delete"
                          onClick={() => {
                            Modal.confirm({
                              title: 'Delete',
                              content: 'Do you want to delete this Product',
                              okText: 'Delete',
                              cancelText: 'Cancel',
                              onOk: () => deleteItem(item.id),
                            });

                          }}
                        >
                          Delete
                  </a>,
                      ]}
                    >
                      <List.Item.Meta
                        title={item.name}
                        description={item.label}
                      />
                    </List.Item>
                  )
                )
              }
            </List>
            <Box my={4} >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Card>
        </div>
      </PageContainer>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(({ listAndbasicList, loading }) => ({
  listAndbasicList,
  loading: loading.models.listAndbasicList,
}))(CardList);
