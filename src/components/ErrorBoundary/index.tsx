import React from 'react';
import { isFunction } from 'lodash-es';
import './index.scoped.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// 出错后显示的元素类型
type FallbackElement = React.ReactElement<
  unknown,
  string | React.FC | typeof React.Component
> | null;

// 出错显示组件的 props
export interface FallbackProps {
  error: Error;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement;
  onError?: (error: Error, info: string) => void;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryState {
  error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (isFunction(this.props.onError)) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  try = () => {
    this.setState(initialState);
  };

  render() {
    const { fallback } = this.props;
    const { error } = this.state;

    if (error !== null) {
      if (React.isValidElement(fallback)) {
        return fallback;
      }

      return (
        <div className="error pt-20">
          <div>
            <CloseCircleOutlined className="close-icon" />
          </div>
          <div className="my-4">出错了, 请刷新重试</div>
          <div>
            <Button type="primary" size="small" onClick={this.try}>
              重试
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
