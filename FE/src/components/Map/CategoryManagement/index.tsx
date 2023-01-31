import React, { useState } from 'react';

import CreateCategoryModalInfo from '@/components/Category/CreateCategoryModalInfo';
import ModifyCategoryModalInfo from '@/components/Category/ModifyCategoryModalInfo';
import GlobalModal from '@/components/common/GlobalModal';

const CategoryManagement = () => {
  const categoryList = ['추가', '수정'];

  const [openModal, setOpenModal] = useState({
    isOpen: false,
    type: '',
  });

  const [isManagement, setIsManagement] = useState(false);

  const handleCancelClick = () => {
    setOpenModal({ isOpen: false, type: '' });
  };

  const handleCategoryMouseEnter = () => {
    setIsManagement(true);
  };

  const handleCategoryMouseLeave = () => {
    setIsManagement(false);
  };

  return (
    <>
      <div
        className="flex flex-col items-center absolute top-32 z-[999]"
        onMouseLeave={handleCategoryMouseLeave}
      >
        <div className="w-[7rem] flex justify-center">
          <button
            type="button"
            className="w-16 h-16 flex justify-center items-center rounded-full bg-navy cursor-pointer hover:opacity-90"
            onMouseEnter={handleCategoryMouseEnter}
          >
            <span className="text-xs text-white">카테고리</span>
          </button>
        </div>
        <ul
          className={`${
            isManagement ? 'display' : 'hidden'
          } w-[7rem] p-4 bg-white rounded-2xl`}
        >
          {categoryList.map(list => (
            <li className="py-2">
              <button
                type="button"
                className="text-sm hover:opacity-80 cursor-pointer"
                onClick={() => setOpenModal({ isOpen: true, type: list })}
              >
                카테고리 {list}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {openModal.isOpen && (
        <GlobalModal size="medium" handleCancelClick={handleCancelClick}>
          {openModal.type === '추가' && (
            <CreateCategoryModalInfo setIsCategoryModal={handleCancelClick} />
          )}
          {openModal.type === '수정' && (
            <ModifyCategoryModalInfo handleCancelClick={handleCancelClick} />
          )}
        </GlobalModal>
      )}
    </>
  );
};

export default CategoryManagement;
