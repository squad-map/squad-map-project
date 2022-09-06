import * as S from './Form.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Input from '@/components/Input';
import theme from '@/styles/theme';

interface EmailBoxProps {
  dataId: number;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailBox = ({ dataId, handleEmailChange }: EmailBoxProps) => (
  <S.EmailBox key={`Email-${dataId}`}>
    <Input
      width="16rem"
      height="2.5rem"
      placeholderText="jinlog9@gmail.com"
      color={theme.color.placeholder}
      background={theme.color.inputBackground}
      type="text"
      onChange={handleEmailChange}
    />
    <Icon
      size="medium"
      url={Icons.Minus}
      alt="이메일 삭제 버튼"
      data-id={dataId}
      cursor
    />
  </S.EmailBox>
);

export default EmailBox;
