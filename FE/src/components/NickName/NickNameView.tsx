import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface NickNameViewProps {
  nickName: string;
  handleNickNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdatedNickName: () => Promise<void>;
}

const NickNameView = ({
  nickName,
  handleNickNameChange,
  handleUpdatedNickName,
}: NickNameViewProps) => (
  <section className="h-full flex flex-col items-center gap-6 py-12">
    <h2 className="text-2xl">닉네임 변경</h2>
    <Image url={Images.LoginBackground} alt="Login Background" />
    <Input
      id="nickname"
      width="20rem"
      height="2.5rem"
      placeholderText="변경할 닉네임을 입력해주세요."
      background={theme.color.inputBackground}
      type="text"
      value={nickName}
      onChange={handleNickNameChange}
    />
    <Button
      className="mt-auto"
      size="regular"
      color={theme.color.blue}
      onClick={handleUpdatedNickName}
    >
      <Text text="변경하기" size="small" color={theme.color.white} />
    </Button>
  </section>
);

export default NickNameView;
