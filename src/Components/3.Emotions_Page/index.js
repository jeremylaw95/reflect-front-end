import React, { useState, useContext } from 'react';
import EmotionsButton from '../Buttons/EmotionsButtons';
import quoteData from './quotesData.js';
import './EmotionsPage.css';
import { useAppContext } from '../../AppContext';
import H2 from '../DisplayText/H2Text';
import H1 from '../DisplayText/H1Text';
import { ThemeContext } from '../../ThemeContext';
import JournalEntry from '../4.Journal_Entry_Page/index.js';
import NavBar from '../NavBar/NavBar';
import CircularProgressWithLabel from '@material-ui/core/CircularProgress';
import NavTop from '../NavTop/index.js';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  h6: {
    padding: '1.5em',
  },
});

function Emotions() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const classes = useStyles();
  // need user_id from ContextProvider

  const { emotionsArray, isAuthenticated, userData } = useAppContext();
  //need to figure out how to close the ability to click for the day/only enable one click per day
  const [chosenEmotion, setChosenEmotion] = useState(null);
  const [emotionChosen, setEmotionChosen] = useState(false);

  if (!isAuthenticated) {
    history.push('/');
  }

  function handleEmotion(emotionNum) {
    setChosenEmotion(emotionNum);
    setEmotionChosen(true);
  }

  if (!userData?.name) {
    return (
      <div className='progressBar'>
        <CircularProgressWithLabel />
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <div className={theme}>
          <NavTop />
          <div>
            {!chosenEmotion && (
              <div>
                <div>
                  <H1 text={`Hi ${userData?.name}!`} />

                  <H2 text={`How are you feeling today?`} />
                </div>
                <div className='emotionsBar'>
                  {emotionsArray.map((emotion) => (
                    <EmotionsButton
                      text={emotion.emotion}
                      handleClick={handleEmotion}
                      emotionNumber={emotion.number}
                      key={emotion.number}
                    />
                  ))}
                </div>
                <Typography variant='h6' className={classes.h6}>
                  {
                    quoteData[Math.floor(Math.random() * quoteData.length)]
                      .quote
                  }
                </Typography>
              </div>
            )}
            {chosenEmotion && <JournalEntry emotion={chosenEmotion} />}
          </div>
        </div>
        <NavBar />
      </div>
    )
  );
}

export default Emotions;
