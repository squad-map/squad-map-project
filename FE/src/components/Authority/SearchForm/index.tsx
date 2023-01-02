import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { postGroupMember } from '@/apis/group';
import { findNickName } from '@/apis/user';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import {
  SUCCESS_GET_NICKNAMES,
  SUCCESS_POST_GROUP_MEMBER,
} from '@/constants/code';
import { permitKey } from '@/constants/key';
import UseDebounce from '@/hooks/UseDebounce';
import theme from '@/styles/theme';
import { GroupPostParams } from '@/types/group';

interface SearchFormProps {
  mapId: number;
  handleCancelClick: () => void;
  groupMembers: string[];
}

interface AuthorityResponse {
  member_id: number;
  nickname: string;
  profile_image: string;
}

const SearchForm = ({
  mapId,
  handleCancelClick,
  groupMembers,
}: SearchFormProps) => {
  const [userNickNames, setUserNickNames] = useState<AuthorityResponse[]>([]);
  const [permission, setPermission] = useState('READ');
  const [searchName, setSearchName] = useState('');
  const debouncedValue = UseDebounce(searchName, 500);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchPostGroup = useMutation(
    ({
      postMapId,
      groupPostBody,
    }: {
      postMapId: number;
      groupPostBody: GroupPostParams;
    }) => postGroupMember(postMapId, groupPostBody),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_POST_GROUP_MEMBER) {
          // 팝업닫기.
          alert('성공적으로 추가되었습니다.');
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const handleOnChangeNickName = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(e.target.value);
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
      }
      return;
    }

    setSelectedIndex(nextIndex);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { dataset } = e.target as HTMLLIElement;
    if (dataset.id) {
      const id = +dataset.id;
      setSelectedIndex(id);
      setSearchName(userNickNames[id].nickname);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPermission(e.target.value);
  };

  const handleSubmit = () => {
    if (userNickNames[selectedIndex].member_id === undefined) return;

    const newGroup = {
      member_id: userNickNames[selectedIndex].member_id,
      permission_level: permission,
    };

    fetchPostGroup.mutate({ postMapId: mapId, groupPostBody: newGroup });
    handleCancelClick();
  };

  useEffect(() => {
    (async () => {
      const response = await findNickName(debouncedValue);

      if (response.code === SUCCESS_GET_NICKNAMES) {
        const filteredMembers = response.data.filter(
          (v: AuthorityResponse) => !groupMembers.includes(v.nickname)
        );

        setUserNickNames(filteredMembers);
        setSelectedIndex(0);
      }
    })();
  }, [debouncedValue, groupMembers, setUserNickNames]);

  return (
    <form
      aria-hidden="true"
      className="h-full flex flex-col justify-between items-center gap-4 p-6"
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        return true;
      }}
    >
      <input
        type="input"
        className="w-80 h-14 px-10 rounded-2xl text-gray border-[1px] border-solid border-black"
        placeholder="Search by nickname"
        value={searchName}
        onKeyUp={handleKeyup}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChangeNickName(e)
        }
      />
      <div className="w-[22rem] h-[11rem] px-4 relative rounded-2xl overflow-hidden z-[1000] bg-white border-[1px] border-solid border-black">
        <ul>
          {userNickNames.length > 0 ? (
            userNickNames.map((user: AuthorityResponse, index) => (
              <li
                aria-hidden="true"
                key={user.member_id}
                className={`my-3 py-[0.2rem] px-2 ${
                  index === selectedIndex ? 'text-white bg-navy' : 'text-black'
                } hover:cursor-pointer hover:underline`}
                data-id={index}
                onClick={handleItemClick}
              >
                {user.nickname}
              </li>
            ))
          ) : (
            <div className="p-8">No Data...</div>
          )}
        </ul>
      </div>
      <select
        className="w-40 rounded-2xl py-2 px-4 border-[1px] border-solid border-black cursor-pointer"
        onChange={handleSelectChange}
      >
        <option value="READ">READ</option>
        <option value="MAINTAIN">MAINTAIN</option>
      </select>
      <div>
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
      </div>
    </form>
  );
};

export default SearchForm;
