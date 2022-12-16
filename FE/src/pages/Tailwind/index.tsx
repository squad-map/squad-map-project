import tw from 'twin.macro'

const SampleH1 = tw.h1`text-blue-500`

const TailWindPage = () => (
    <>
        <SampleH1>Hello world</SampleH1>
        <span tw="text-blue-500"> Test</span>
    </>
)

export default TailWindPage;