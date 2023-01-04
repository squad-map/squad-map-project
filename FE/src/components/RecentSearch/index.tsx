import { RecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

const RecentSearch = ({
  searchState,
}: {
  searchState: RecoilState<string[]>;
}) => {
  const searchData = useRecoilValue(searchState);
  const resetInit = useResetRecoilState(searchState);

  const handleSearchAllRemove = () => {
    resetInit();
  };

  return (
    <section className="w-[30rem] h-[37.5rem] relative rounded-2xl mt-4 overflow-hidden bg-white z-[1000]">
      <div className="p-10">
        <Text text="최근검색어" size="xRegularFill" color={theme.color.black} />
        <div className="w-[25rem] h-[1px] my-4 bg-gray" />
        <div className="flex flex-col gap-4">
          {searchData &&
            searchData.map((value: string) => (
              <Text
                key={value}
                text={value}
                size="regular"
                color={theme.color.lightGray}
                hover
              />
            ))}
        </div>
      </div>
      <div className="w-full h-8 p-4 absolute bottom-0 flex justify-between items-center border-[1px] border-solid border-navy bg-darkNavy">
        <Button
          size="xSmall"
          color={theme.color.transparent}
          onClick={handleSearchAllRemove}
        >
          <Text
            text="전체삭제"
            size="regular"
            color={theme.color.white}
            hover
          />
        </Button>
        <Text
          text="최근검색어 끄기"
          size="regular"
          color={theme.color.white}
          hover
        />
      </div>
    </section>
  );
};

export default RecentSearch;
