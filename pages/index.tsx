import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Calendar } from '../components/Calendar';
import { Modal } from '../components/Modal';
import { useModal } from '../hooks/modal';

const Home: NextPage<{appid: string}> = ({appid}) => {

  const {updateAppId} = useModal()

  useEffect(() => {
    updateAppId(appid)
  },[appid])

  return (
    <div className="relative overflow-hidden">
      
        <Calendar />
      
      <Modal />
    </div>
  );
};

export async function getStaticProps() {
  const appid = process.env.NEXT_PUBLIC_API_KEY || ''
  return {
    props : {
      appid
    }
  }
}


export default Home;
