/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const TailWindPage = () => (
  <>
    <div tw="md:flex m-12 p-8 md:p-0">Test Div Component</div>
    <div css={tw`mt-[20px]`}>Div Component2</div>
  </>
);

export default TailWindPage;
