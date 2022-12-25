import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/KakaoStaticMap';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';

const PlaceModalReview = ({ placeInfo }: { placeInfo: PlaceDetail }) => (
  <div className="w-[27.5rem] h-full flex flex-col justify-between items-center gap-4 py-8">
    <header className="flex flex-col items-center gap-4">
      <h1 className="text-lg">{placeInfo.place_name}</h1>
      <p className="text-md text-darkGray">{placeInfo.address}</p>
    </header>
    <KakaoStaticMap placeInfo={placeInfo} />
    {/*  리뷰 작성 Form */}
    <article className="w-full flex gap-4">
      <form className="flex flex-col gap-4">
        <Text text="한 줄 리뷰 작성" size="small" color={theme.color.gray} />
        <textarea
          className="w-[13.125rem] h-[9.5rem] p-4 rounded-2xl bg-inputBackground resize-none"
          maxLength={100}
        />
      </form>
      <div className="flex flex-col gap-4">
        <Text text="한 줄 리뷰들" size="small" color={theme.color.gray} />
        <div>
          <div>리뷰 1</div>
          <div>리뷰 2</div>
          <div>리뷰 3</div>
        </div>
      </div>
    </article>
    <Button size="xLarge" color={theme.color.yellow}>
      <Text
        text="카카오맵으로 자세히 보기"
        size="regular"
        color={theme.color.lightBlack}
      />
    </Button>
  </div>
);

export default PlaceModalReview;
