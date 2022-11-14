import GroupInfo from '../../../components/Authority/GroupInfo';
import SearchForm from '../../../components/Authority/SearchForm';

import * as S from './Authority.style';

import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface AuthorityProps {
  mapId: number;
  handleCancelClick: () => void;
}

const Authority = ({ mapId, handleCancelClick }: AuthorityProps) => (
  <S.AuthorityWrapper onClick={e => e.preventDefault()}>
    <Text
      text="Group Permission Management"
      size="xRegularFill"
      color={theme.color.black}
    />
    <GroupInfo mapId={mapId} />
    <SearchForm mapId={mapId} handleCancelClick={handleCancelClick} />
  </S.AuthorityWrapper>
);

export default Authority;
