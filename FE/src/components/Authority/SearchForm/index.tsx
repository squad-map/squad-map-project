import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import SearchSubmitButton from '../SearchSubmitButton';

import * as S from './SearchForm.style';

import { postGroupMember } from '@/apis/group';
import { findNickName } from '@/apis/user';
import { permitKey } from '@/constants/key';
import UseDebounce from '@/hooks/UseDebounce';
import { GroupPostParams } from '@/types/group';

interface SearchFormProps {
    mapId: number;
    handleCancelClick: () => void;
}

interface AuthorityResponse {
    id: number;
    nickname: string;
    profile_image: string;
}

const SearchForm = ({ mapId, handleCancelClick }: SearchFormProps) => {
    const [userNickNames, setUserNickNames] = useState<AuthorityResponse[]>([]);
    const [permission, setPermission] = useState("READ");
    const [searchName, setSearchName] = useState("");
    const debouncedValue = UseDebounce(searchName, 500);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const fetchPostGroup = useMutation(({ postMapId, groupPostBody }: {
        postMapId: number;
        groupPostBody: GroupPostParams;
    }) => postGroupMember(postMapId, groupPostBody),
        {
            onSuccess: (data: { member_id: number }) => {
                if (data.member_id) {
                    // 팝업닫기.
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
            setSearchName(userNickNames[id].nickname);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPermission(e.target.value);
    }

    const handleSubmit = () => {
        const newGroup = { member_id: userNickNames[selectedIndex].id, permission_level: permission };
        fetchPostGroup.mutate({ postMapId: mapId, groupPostBody: newGroup });
        handleCancelClick();
    };

    useEffect(() => {
        (async () => {
            const getNicknames = await findNickName(debouncedValue);

            if (getNicknames) {
                setUserNickNames(getNicknames);
                setSelectedIndex(0);
            }
        })();
    }, [debouncedValue, setUserNickNames]);

    return (
        <S.SearchForm onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
            return true;
        }}>
            <S.SearchInput
                type="input"
                placeholder="Search by nickname"
                value={searchName}
                onKeyUp={handleKeyup}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChangeNickName(e)
                }
            />
            <S.SearchContent>
                <S.AuthorityUL>
                    {userNickNames.length > 0 ? userNickNames.map((user: AuthorityResponse, index) => (
                        <S.AuthorityLiItem
                            key={user.id}
                            data-id={index}
                            selectedIndex={index === selectedIndex}
                            onClick={handleItemClick}
                        >
                            {user.nickname}
                        </S.AuthorityLiItem>
                    )) : (<S.AuthorityNoData>No Data...</S.AuthorityNoData>)}
                </S.AuthorityUL>
            </S.SearchContent>
            <S.SearchSelectBox onChange={handleSelectChange}>
                <S.SearchOption value="READ">READ</S.SearchOption>
                <S.SearchOption value="MAINTAIN">MAINTAIN</S.SearchOption>
            </S.SearchSelectBox>
            <SearchSubmitButton handleSubmit={handleSubmit} />
        </S.SearchForm>
    )
}

export default SearchForm;
