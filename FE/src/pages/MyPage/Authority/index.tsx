import * as S from './Authority.style';
import GroupInfo from './GroupInfo';
import SearchForm from './SearchForm';

import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface AuthorityProps {
  mapId: number;
}

const Authority = ({ mapId }: AuthorityProps) => (
  <S.AuthorityWrapper onClick={e => e.preventDefault()}>
    <Text
      text="Group Permission Management"
      size="xRegularFill"
      color={theme.color.black}
    />
    <GroupInfo mapId={mapId} />
    <SearchForm mapId={mapId} />
  </S.AuthorityWrapper>
);

export default Authority;
