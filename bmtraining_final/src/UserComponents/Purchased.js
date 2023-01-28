import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'
import './Purchased.css'
import { Card } from 'antd';
import { Row, Col } from 'antd';
import ProdService from '../services/ProdService';
import { useParams } from 'react-router-dom';

class Purchased extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: [],
            cancel: []
        }
    }

    componentDidMount() {
        ProdService.getSuccess(this.props.myHookValue).then((response) => {
            this.setState({ success: response.data })
        });
        ProdService.getCancel(this.props.myHookValue).then((response) => {
            this.setState({ cancel: response.data })
        });
    }

    render() {
        return (
            <>
                <h1>Purchased</h1>
                <div className="status">
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="All Purchased">

                            <Card title="Purchased Date">
                                <Card
                                    type="inner"
                                    title="Payment Status" extra={<a>Success</a>} >
                                    {<>
                                        {
                                            this.state.success.map(
                                                item => (
                                                    <Row>
                                                        <Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 1 }}>
                                                            <img className="thumbnail"
                                                                alt="example"
                                                                src={item.image}
                                                            />
                                                        </Col>
                                                        <Col span={14} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 2 }}>
                                                            <p className="descript">Description: {item.description}</p>
                                                            <p className="time">Purchased time: {item.payment_time}</p>
                                                        </Col>
                                                        <Col span={2} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
                                                            <p className="total">${item.total}</p>
                                                        </Col>
                                                        <hr></hr>
                                                    </Row>
                                                )
                                            )
                                        }
                                    </>
                                    }
                                </Card>
                            </Card>



                        </Tab>

                        <Tab eventKey="cancel" title="Cancelled">
                            <Card title="Purchased Date">
                                <Card
                                    type="inner"
                                    title="Payment Status" extra={<a>Cancelled</a>} >
                                    {<>
                                        {
                                            this.state.cancel.map(item => (
                                                <Row>
                                                    <Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 1 }}>
                                                        <img className="thumbnail"
                                                            alt="example"
                                                            src={item.image}
                                                        />
                                                    </Col>
                                                    <Col span={14} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 2 }}>
                                                        <p className="descript">Description: {item.description}</p>
                                                        <p className="time">Canceled time: {item.payment_time}</p>
                                                    </Col>
                                                    <Col span={2} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
                                                        <p className="total">${item.total}</p>
                                                    </Col>
                                                    <hr></hr>
                                                </Row>
                                            ))
                                        }
                                    </>
                                    }
                                </Card>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>

            </>
        )
    }
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useParams();
        return <Component {...props} myHookValue={myHookValue.username} />;
    }
}

export default withMyHook(Purchased);
