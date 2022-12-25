import GroupInfo from '../../Authority/GroupInfo';
import SearchForm from '../../Authority/SearchForm';

import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface AuthorityProps {
  mapId: number;
  handleCancelClick: () => void;
}

const Authority = ({ mapId, handleCancelClick }: AuthorityProps) => (
  <section
    aria-hidden="true"
    className="flex flex-col items-center mt-8"
    onClick={e => e.preventDefault()}
  >
    <Text
      text="Group Permission Management"
      size="xRegularFill"
      color={theme.color.black}
    />
    <GroupInfo mapId={mapId} />
    <SearchForm mapId={mapId} handleCancelClick={handleCancelClick} />
  </section>
);

export default Authority;
