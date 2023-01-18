import { useNavigate } from 'react-router-dom';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface BackButtonProps {
  emoji: string;
  title: string;
}

const BackButton = ({ emoji, title }: BackButtonProps) => {
  const navigte = useNavigate();

  return (
    <button
      type="button"
      className="h-16 flex items-center gap-4 p-4 bg-navy rounded-r-2xl cursor-pointer"
      onClick={() => navigte(-1)}
    >
      <Icon size="large" url={Icons.ArrowBack} alt="뒤로가기 버튼 이미지" />
      <Text
        size="xLarge"
        text={`${emoji} ${title}`}
        color={theme.color.white}
      />
    </button>
  );
};

export default BackButton;
