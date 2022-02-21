import type { NextPage } from 'next';
import { Calendar } from '../components/Calendar';
import { Modal } from '../components/Modal';

const Home: NextPage = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="h-screen w-screen ">
        <Calendar />
      </div>
      <Modal />
    </div>
  );
};

export default Home;
