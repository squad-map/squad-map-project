import { Images } from '@/assets/images';

const NotFoundPage = () => (
  <div className="w-screen h-screen flex justify-center items-center bg-white">
    <img className="w-56 h-56" src={Images.NotFoundImage} alt="NotFoundPage" />
  </div>
);

export default NotFoundPage;
