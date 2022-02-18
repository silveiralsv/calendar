import type { NextPage } from 'next'
import {getDaysInMonth} from 'date-fns'



const Home: NextPage = () => {
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const firstDateOfMonth = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`);
  console.log(`@@@@@ [LOG] ${new Date().toLocaleString()}  -> days`, firstDateOfMonth)
  const days = []
  
  while (firstDateOfMonth.getMonth() === 1) {
    days.push(new Date(firstDateOfMonth));
    firstDateOfMonth.setDate(firstDateOfMonth.getDate() + 1);
  }
  console.log(`@@@@@ [LOG] ${new Date().toLocaleString()}  -> days`, days)
  
  return (
    
      <div className='grid gap-3 grid-cols-7 bg-sky-600 h-full'>
        {daysOfWeek.map(day => (
          <span className='flex item-center justify-center h-full' key={day}>{day}</span>
          ))}
        {days.map(day => (
          <span className='flex item-center justify-center h-full' key={day.getDate()}>{day.getDate()}</span>
        ))}
      </div>
      
    
    
  )
}

export default Home
