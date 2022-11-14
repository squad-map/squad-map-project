import * as S from './SearchSubmitButton.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';


const SearchSubmitButton = ({ handleSubmit }: { handleSubmit: () => void }) => (
    <S.SearchSubmitButton>
        <Button
            type="submit"
            size="xRegular"
            color={theme.color.clearOrange}
            onClick={handleSubmit}
        >
            <Text
                text="ADD MEMBER"
                size="xRegularFill"
                color={theme.color.white}
            />
        </Button>
    </S.SearchSubmitButton>
)

export default SearchSubmitButton;