import React, { Component } from 'react';
import ProdService from '../services/ProdService';
import { useParams } from 'react-router-dom';
import CardItem from './CardItem';
import './ListProd.css';

class SearchShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
        }
    }

    componentDidMount() {
        ProdService.search(this.props.myHookValue).then((response) => {
            this.setState({ result: response.data })
        });
    }

    render() {
        return (
            <>
                <div className='cards'>
                    <h1>All results</h1>
                    <div className='cards__container'>
                        <div className='cards__wrapper'>
                            <ul className='cards__items'>
                                {
                                    this.state.result.map(
                                        item =>
                                            <CardItem
                                                src={item.image1}
                                                prodName={item.productname}
                                                price={item.price}
                                                path={`/details/${item.id}`}
                                            />
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useParams();
        return <Component {...props} myHookValue={myHookValue.value} />;
    }
}

export default withMyHook(SearchShop);
