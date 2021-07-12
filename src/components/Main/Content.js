import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadAllOrders, subscribeEventsOrders } from '../../store/orders-actions';
import { subscribeEventsExchange } from '../../store/exchange-actions';
import { getExchange } from '../../instances/contracts';
import Trades from './Trades';
import OrderBook from './OrderBook';
import MyTransactions from './MyTransactions';
import PriceChart from './PriceChart';
import Balance from './Balance';
import NewOrder from './NewOrder';

const Content = () => {
  const dispatch = useDispatch();
  const networkId = useSelector(state => state.web3.networkId);

  const exchange = getExchange(networkId);
  
  useEffect(() => {
    dispatch(loadAllOrders(exchange));
    dispatch(subscribeEventsOrders(exchange));
    dispatch(subscribeEventsExchange(exchange));
  }, []);
  
  return(
    <div className="content">
      <div className="vertical-split">
        <Balance />
        <NewOrder />        
      </div>
      <OrderBook />
      <div className="vertical-split">
        <PriceChart />
        <MyTransactions />
      </div>
      <Trades />
    </div>
  ); 
};

export default Content;


