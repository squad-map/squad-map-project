import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import SearchSubmitButton from '../SearchSubmitButton';

import * as S from './SearchForm.style';

import { postGroupMember } from '@/apis/group';
import { findNickName } from '@/apis/user';
import { permitKey } from '@/constants/key';
import UseDebounce from '@/hooks/UseDebounce';
import { GroupPostParams } from '@/types/group';

interface AuthorityResponse {
    id: number;
    nickname: string;
    profile_image: string;
}

const SearchForm = ({ mapId }: { mapId: number }) => {
    const [userNickNames, setUserNickNames] = useState<AuthorityResponse[]>([]);
    const [onSearchContent, setOnSearchContent] = useState(false);
    const [searchName, setSearchName] = useState("");
    const debouncedValue = UseDebounce(searchName, 500);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const fetchPostGroup = useMutation(({ postMapId, groupRequestBody }: {
        postMapId: number;
        groupRequestBody: GroupPostParams;
    }) => postGroupMember(postMapId, groupRequestBody),
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
            return;
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

    const handleSubmit = () => {
        const newGroup = { member_id: userNickNames[selectedIndex].id, permission_level: 'READ' };
        fetchPostGroup.mutate({ postMapId: mapId, groupRequestBody: newGroup });
    };

    useEffect(() => {
        (async () => {
            const getNicknames = await findNickName(debouncedValue);
            if (getNicknames) {
                setUserNickNames(getNicknames);
                setOnSearchContent(true);
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
                onFocus={handleFocus}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnChangeNickName(e)
                }
            />
            {onSearchContent && (
                <S.SearchContent>
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
                </S.SearchContent>
            )}
            <SearchSubmitButton handleSubmit={handleSubmit} />
        </S.SearchForm>
    )
}

export default SearchForm;
