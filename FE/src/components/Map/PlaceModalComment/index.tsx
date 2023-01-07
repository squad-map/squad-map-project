import CreateComment from '../Comment/CreateComment';
import PatchCommentList from '../Comment/PatchCommentList';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/KakaoStaticMap';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';

interface PlaceModalComment {
  mapHostId: number;
  placeInfo: PlaceDetail;
}

const PlaceModalComment = ({ mapHostId, placeInfo }: PlaceModalComment) => {
  // 기존 placeInfo 데이터에 이미 해당 장소에 대한 댓글들이 존재한다.
  // 댓글을 작성하면 placeInfo 데이터도 업데이트 해야한다. -> 상위 컴포넌트 getPlaceDeatil 함수 부분을 useMutation으로 수정후 refetch 함수를 전달받도록 수정하자.
  const {
    place_id,
    comments: { content },
  } = placeInfo;

  return (
    <div className="w-[27.5rem] h-full flex flex-col justify-between items-center gap-4 py-6">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-lg">{placeInfo.place_name}</h1>
        <p className="text-md text-darkGray">{placeInfo.address}</p>
      </header>
      <KakaoStaticMap placeInfo={placeInfo} />
      {/*  댓글 작성 Form */}
      <article className="w-full flex gap-4">
        {place_id && <CreateComment placeId={place_id} />}
        {content && (
          <PatchCommentList mapHostId={mapHostId} content={content} />
        )}
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
};

export default PlaceModalComment;
