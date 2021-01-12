import React, { useContext } from 'react';
import LogoutButton from '../Buttons/LogOutButton/index';
import H2 from '../DisplayText/H2Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';
import './Logout.css';

function Logout() {
  const theme = useContext(ThemeContext);
  const { userData, isAuthenticated, isLoading } = useAppContext();
  // if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }

  const name = userData ? userData?.name : '';

  return (
    <div id={theme} className={'logout', 'container'}>
      <H2
        text={`Great Stuff ${name}! Don't forget to log back in tomorrow to update your journey`}
      />
      <SoCLogo style={{ width: '200px', margin: '20px' }} />
      <br />
      <LogoutButton className='btn' />
    </div>
  );
}

export default Logout;