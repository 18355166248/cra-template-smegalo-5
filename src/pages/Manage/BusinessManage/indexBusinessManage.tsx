import TableLayout from './TableBusinessManage';
import FilterForm from './FilterFormBusinessManage';
import OrderReducer from './BusinessManage.reducer';
import DetailModal from './DetailModalBusinessManage';

// 业务管理
const OrderManager = () => {
  return (
    <OrderReducer>
      <>
        {/* 过滤器 */}
        <FilterForm />
        {/* 表格 */}
        <TableLayout />
        {/* 弹窗 */}
        <DetailModal />
      </>
    </OrderReducer>
  );
};

export default OrderManager;
