import { useState } from 'react';

const useAlertModal = () => {
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: '',
    type: 'default',
    title: '알림'
  });

  const showAlert = (message, type = 'default', title = '알림') => {
    setAlertModal({
      isOpen: true,
      message,
      type,
      title
    });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleApiError = (err, defaultMessage = '오류가 발생했습니다.') => {
  console.error('API 오류:', err);

  const status = err.response?.status;
  const errorMessage = err.response?.data?.message;

  // 404지만 '데이터 없음'이면 모달 안 띄움
  if (status === 404 && errorMessage === '그룹을 찾을 수 없습니다.') {
    // 그냥 무시하고 끝냄
    return;
  }

  // 진짜 에러만 모달로 띄움
  showAlert(errorMessage || defaultMessage, 'danger', '오류');
};

  return { alertModal, showAlert, closeAlert, handleApiError };
};

export default useAlertModal;