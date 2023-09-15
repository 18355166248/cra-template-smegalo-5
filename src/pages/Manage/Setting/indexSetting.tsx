import TableLayout from './TableSetting';
import FilterForm from './FilterFormSetting';
import OrderReducer from './Setting.reducer';
import DetailModal from './DetailModalSetting';

// 设置管理
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
