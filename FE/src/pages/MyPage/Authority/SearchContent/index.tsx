import { useEffect, useState } from 'react';

import * as S from './SearchContent.style';

import { findNickName } from '@/apis/user';
import { permitKey } from '@/constants/key';
import UseDebounce from '@/hooks/UseDebounce';

interface AuthorityResponse {
    id: number;
    nickname: string;
    profile_image: string;
}

const SearchContent = () => {
    const [userNickNames, setUserNickNames] = useState<AuthorityResponse[]>([]);
    const [onSearchContent, setOnSearchContent] = useState(false);
    const [searchName, setSearchName] = useState("");
    const debouncedValue = UseDebounce(searchName, 500);

    const [selectedIndex, setSelectedIndex] = useState(0);

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
                setOnSearchContent(true);
                setSelectedIndex(0);
            }
        })();
    }, [debouncedValue, setUserNickNames]);

    return (
        <>
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
        </>
    )
}

export default SearchContent;
