import React, { useEffect, useState } from 'react';

import * as S from './Authority.style';
import GroupInfo from './GroupInfo';

import { findNickName } from '@/apis/user';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { permitKey } from '@/constants/key';
import UseDebounce from '@/hooks/UseDebounce';
import theme from '@/styles/theme';

interface AuthorityResponse {
  id: number;
  nickname: string;
  profile_image: string;
}

// TODO: ArrowUp, ArrowDown 이벤트 발생시 GroupInfo 컴포넌트 렌더링 막기!

const Authority = ({ mapId }: { mapId: number }) => {
  const [searchName, setSearchName] = useState('');
  const debouncedValue = UseDebounce(searchName, 500);

  const [userNickNames, setUserNickNames] = useState<AuthorityResponse[]>([]);
  const [onSearchContent, setOnSearchContent] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnChangeNickName = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = () => {
    if (searchName === '') return;
    setOnSearchContent(false);
    setSearchName('');
  };

  const handleFocus = () => {
    if (!onSearchContent) {
      setOnSearchContent(true);
    }
  };

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (!permitKey.includes(key)) return;

    const lastIndex = userNickNames.length - 1;
    let nextIndex = selectedIndex;
    // Keyup, KeyDown, Enter 일 때,
    if (key === 'ArrowUp') {
      nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
    } else if (key === 'ArrowDown') {
      nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
    } else if (key === 'Enter') {
      if (userNickNames[selectedIndex]) {
        setSearchName(userNickNames[selectedIndex].nickname);
        setOnSearchContent(false);
      }
    }

    setSelectedIndex(nextIndex);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { dataset } = e.target as HTMLLIElement;
    if (dataset.id) {
      const id = +dataset.id;
      setSearchName(userNickNames[id].nickname);
      setOnSearchContent(false);
    }
  };

  useEffect(() => {
    (async () => {
      const getNicknames = await findNickName(debouncedValue);
      if (getNicknames) {
        setUserNickNames(getNicknames);
      }
    })();
  }, [debouncedValue, setUserNickNames]);

  return (
    <S.AuthorityWrapper onClick={e => e.preventDefault()}>
      <Text
        text="Add people to this Project"
        size="xRegularFill"
        color={theme.color.black}
      />
      <GroupInfo mapId={mapId} />
      <S.AuthoritySearchInput
        type="input"
        placeholder="Search by nickname"
        value={searchName}
        onKeyUp={handleKeyup}
        onFocus={handleFocus}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChangeNickName(e)
        }
      />
      {onSearchContent && (
        <S.AuthoritySearchContent>
          <S.AuthorityUL>
            {userNickNames.map((user: AuthorityResponse, index) => (
              <S.AuthorityLiItem
                key={user.id}
                data-id={index}
                selectedIndex={index === selectedIndex}
                onClick={handleItemClick}
              >
                {user.nickname}
              </S.AuthorityLiItem>
            ))}
          </S.AuthorityUL>
        </S.AuthoritySearchContent>
      )}
      <S.AuthorityButtonWrapper>
        <Button
          type="submit"
          size="xRegular"
          color={theme.color.clearOrange}
          onClick={handleSubmit}
        >
          <Text
            text="ADD MEMBER"
            size="xRegularFill"
            color={theme.color.white}
          />
        </Button>
      </S.AuthorityButtonWrapper>
    </S.AuthorityWrapper>
  );
};

export default Authority;
