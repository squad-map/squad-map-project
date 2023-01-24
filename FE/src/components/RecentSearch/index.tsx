import { useRecoilValue, useResetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { searchplaceState } from '@/recoil/atoms/searchplace';
import theme from '@/styles/theme';

interface RecentSearchProps {
  setOnRecentSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSerachValue: React.Dispatch<React.SetStateAction<string>>;
}

const RecentSearch = ({
  setOnRecentSearch,
  setSerachValue,
}: RecentSearchProps) => {
  const searchData = useRecoilValue(searchplaceState);

  const resetSearchPlace = useResetRecoilState(searchplaceState);

  const handeItemClick = (value: string) => {
    setSerachValue(value);
    setOnRecentSearch(false);
  };

  return (
    <section className="w-[30rem] h-[37.5rem] relative rounded-2xl mt-4 overflow-hidden bg-white z-[1000]">
      <div className="p-10">
        <Text text="최근검색어" size="xRegularFill" color={theme.color.black} />
        <div className="w-[25rem] h-[1px] my-4 bg-gray" />
        <ul className="flex flex-col gap-4">
          {searchData &&
            searchData.map((value: string) => (
              <li className="flex" key={value}>
                <button type="button" onClick={() => handeItemClick(value)}>
                  <Text
                    key={value}
                    text={value}
                    size="regular"
                    color={theme.color.lightGray}
                    hover
                  />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-full h-8 p-4 absolute bottom-0 flex justify-between items-center border-[1px] border-solid border-navy bg-darkNavy">
        <Button
          className="cursor-pointer"
          size="xSmall"
          color={theme.color.transparent}
          onClick={() => resetSearchPlace()}
        >
          <Text
            text="전체삭제"
            size="regular"
            color={theme.color.white}
            hover
          />
        </Button>
        <Button
          className="cursor-pointer"
          size="xSmall"
          color={theme.color.transparent}
          onClick={() => setOnRecentSearch(false)}
        >
          <Text text="닫기" size="regular" color={theme.color.white} hover />
        </Button>
      </div>
    </section>
  );
};

export default RecentSearch;
