import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './Item.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { IMyMap } from '@/interfaces/IMyMap';
import Authority from '@/pages/MyPage/Authority';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

interface ItemProps {
  item: IMyMap;
}

const Item = ({ item }: ItemProps) => {
  const [isOpenAuthorityModal, setIsOpenAuthorityModal] = useState(false);

  return (
    <>
      <S.Item>
        <S.ItemHeader>
          <Text
            text={`${unicodeToEmoji(item.map_emoji)} ${item.map_name}`}
            size="xRegularFill"
            color={theme.color.darkGray}
          />
          <S.ItemManageMent>
            <Button
              size="xSmall"
              color={theme.color.navy}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setIsOpenAuthorityModal(true);
              }}
            >
              <Text text="그룹관리" size="small" color={theme.color.white} />
            </Button>
            <Link
              to={`/mypage/modify/${item.id}`}
              state={{
                map_name: item.map_name,
                map_emoji: unicodeToEmoji(item.map_emoji),
              }}
            >
              <Icon size="small" url={Icons.Edit} alt="Edit Icon" />
            </Link>
          </S.ItemManageMent>
        </S.ItemHeader>
        <S.ItemFooter>
          <Text
            text={`${item.places_count}개의장소`}
            size="xSmall"
            color={theme.color.gray}
          />
        </S.ItemFooter>
      </S.Item>
      {isOpenAuthorityModal && (
        <GlobalModal
          size="small"
          handleCancelClick={(e: React.MouseEvent<HTMLElement> | undefined) => {
            e?.preventDefault();
            setIsOpenAuthorityModal(false);
          }}
        >
          <Authority />
        </GlobalModal>
      )}
    </>
  );
};
export default Item;
