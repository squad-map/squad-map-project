import React, { useEffect, useState } from 'react';

import * as S from './Authority.style';

import { findNickName } from '@/apis/user';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import UseDebounce from '@/hooks/UseDebounce';
import theme from '@/styles/theme';

interface AuthorityResponse {
  id: number;
  nickname: string;
  profile_image: string;
}

const Authority = () => {
  const [searchName, setSearchName] = useState('');
  const debouncedValue = UseDebounce(searchName, 500);

  const [userNickNames, setUserNickNames] = useState([]);
  const [onSearchContent, setOnSearchContent] = useState(false);

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
      <S.AuthoritySearchInput
        type="input"
        placeholder="Search by nickname"
        value={searchName}
        onFocus={handleFocus}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChangeNickName(e)
        }
      />
      {onSearchContent && (
        <S.AuthoritySearchContent>
          <S.AuthorityUL>
            {userNickNames.map((user: AuthorityResponse) => (
              <S.AuthorityLiItem key={user.id} data-id={user.id}>
                {user.nickname}
              </S.AuthorityLiItem>
            ))}
          </S.AuthorityUL>
        </S.AuthoritySearchContent>
      )}
      <S.AuthorityButtonWrapper>
        <Button size="xRegular" color={theme.color.clearOrange}>
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
