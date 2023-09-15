import { queryInvoicedOrder } from '@/services/invoiceOrder';
import { notification } from 'antd';
import React, { useEffect, useReducer, useRef } from 'react';
import { defaultValue, IndexContext } from './BusinessManage.context';

interface Props {
  children?: React.ReactNode;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'setFilterForm':
      return {
        ...state,
        filterForm: { ...state.filterForm, ...action.payload },
      };
    case 'resetFilterForm':
      return {
        ...state,
        filterForm: {},
      };
    case 'setModalData':
      return {
        ...state,
        modalData: { ...action.payload },
      };
    case 'setModalVisible':
      return {
        ...state,
        modalVisible: action.payload,
      };
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };
    default:
      // throw new Error();
      return state;
  }
}

const OrderReducer = (props: Props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, defaultValue);

  const { pagination, filterForm } = state;

  const initLoad = useRef(true);

  useEffect(() => {
    if (initLoad.current) {
      initLoad.current = false;
    } else {
      getList();
    }
  }, [pagination.current, pagination.pageSize, filterForm]);

  // 设置表单
  function setFilterForm(values: any) {
    dispatch({
      type: 'setFilterForm',
      payload: values,
    });
  }

  function resetFilterForm() {
    dispatch({
      type: 'resetFilterForm',
    });
  }

  function reset() {
    resetFilterForm();
    setState({
      pagination: { current: 1, pageSize: 10, total: 0 },
    });
  }

  function setModalVisible(bool: boolean) {
    dispatch({
      type: 'setModalVisible',
      payload: bool,
    });
  }

  function setState(value: any) {
    dispatch({
      type: 'setState',
      payload: value,
    });
  }

  function onCreate() {
    setState({
      modalVisible: true,
      modalType: 'create',
      modalData: {},
    });
  }

  function getList(values: any = {}) {
    setState({
      dataSource: {
        data: state.dataSource.data,
        success: false,
        error: false,
        done: false,
      },
    });

    queryInvoicedOrder({
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
      ...filterForm,
      ...values,
    })
      .then((res: any) => {
        setState({
          dataSource: {
            data: res.data,
            success: true,
            error: false,
            done: true,
          },
          pagination: {
            current: res.pageId,
            pageSize: res.pageSize,
            total: res.totalCount,
          },
        });
      })
      .catch((error: any) => {
        setState({
          dataSource: {
            data: [],
            success: false,
            error: true,
            done: true,
          },
        });
        error?.message &&
          notification.error({
            message: error?.message,
          });
      });
  }

  return (
    <IndexContext.Provider
      value={{
        ...state,
        dispatch,
        setFilterForm,
        resetFilterForm,
        setModalVisible,
        setState,
        getList,
        onCreate,
        reset,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};

export default OrderReducer;
