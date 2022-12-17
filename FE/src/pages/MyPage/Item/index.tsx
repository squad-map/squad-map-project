import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { IMyMap } from '@/interfaces/IMyMap';
import UserProfile from '@/pages/Map/Infos/UserProfile';
import Authority from '@/pages/MyPage/Authority';
import theme from '@/styles/theme';
import { MapUserType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

interface ItemProps {
  item: IMyMap;
}

const Item = ({ item }: ItemProps) => {
  const [isOpenAuthorityModal, setIsOpenAuthorityModal] = useState(false);
  const user: MapUserType = {
    host_id: item.host_id,
    host_nickname: item.host_nickname,
    host_profile_image: item.host_profile_image,
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <header className="flex justify-between items-center">
          <Text
            text={`${unicodeToEmoji(item.map_emoji)} ${item.map_name}`}
            size="xRegularFill"
            color={theme.color.darkGray}
          />
          <div className="flex items-center gap-4">
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
          </div>
        </header>
        <UserProfile user={user} />
        <footer className="flex justify-between">
          <Text
            text={`${item.places_count}개의장소 등록됨`}
            size="xSmall"
            color={theme.color.gray}
          />
        </footer>
      </div>
      {isOpenAuthorityModal && (
        <GlobalModal
          size="large"
          handleCancelClick={(e: React.MouseEvent<HTMLElement> | undefined) => {
            e?.preventDefault();
            setIsOpenAuthorityModal(false);
          }}
        >
          <Authority
            mapId={item.id}
            handleCancelClick={() => setIsOpenAuthorityModal(false)}
          />
        </GlobalModal>
      )}
    </>
  );
};
export default Item;
