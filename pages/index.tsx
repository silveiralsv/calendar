import type { NextPage } from 'next';
import { Calendar } from '../components/Calendar';
import { Modal } from '../components/Modal';

const Home: NextPage = () => {
  return (
    <div className="relative overflow-hidden">
      
        <Calendar />
      
      <Modal />
    </div>
  );
};

export default Home;
