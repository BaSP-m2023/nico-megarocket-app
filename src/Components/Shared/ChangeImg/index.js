import React from 'react';
import styles from './changeImg.module.css';

const ProfilePicList = ({ profilePic, photoEdit, show, counter }) => {
  const picList = [];
  for (let i = 0; i < 15; i++) {
    const profilePicMale = `https://xsgames.co/randomusers/assets/avatars/male/${i}.jpg`;
    const profilePicFemale = `https://xsgames.co/randomusers/assets/avatars/female/${i}.jpg`;
    picList.push(profilePicMale);
    picList.push(profilePicFemale);
  }
  let style = show ? styles.container : counter === 0 ? styles.hidden : styles.hide;

  const handleClick = (img) => {
    counter = counter + 1;
    sessionStorage.setItem('img', img);
    profilePic(sessionStorage.getItem('img'));
    photoEdit(false);
  };

  return (
    <div className={style}>
      <div className={styles.picContainer}>
        <span className={styles.closeButton} onClick={() => photoEdit(false)}>
          x
        </span>
        {picList.map((pic, index) => {
          return (
            <img
              onClick={() => handleClick(pic)}
              className={styles.picStyle}
              key={index}
              src={pic}
              alt={`Profile Image ${index}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePicList;
