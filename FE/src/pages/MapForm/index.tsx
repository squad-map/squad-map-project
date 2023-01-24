import { useLocation, useParams } from 'react-router-dom';

import Form from '../../components/Form';

import Header from '@/components/common/Header';

const MapForm = () => {
  const params = useParams();
  const location = useLocation();

  return (
    <>
      <Header />
      <Form mapId={params.id} state={location.state} />
    </>
  );
};

export default MapForm;
