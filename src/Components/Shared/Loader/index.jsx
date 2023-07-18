import { useEffect, useState } from 'react';
import style from './loader.module.css';

const Loader = (testId) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((per) => {
        if (per === 100) {
          clearInterval(timer);
          return per;
        } else {
          return per + 10;
        }
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={style.backgroundLoader} data-testid={testId}>
      <div className={style.containerLoader}>
        <div className={style.subContainerLoader}>
          <div className={style.containerMuscle}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/muscle.png`}
              className={style.muscleRigth}
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logoTwo.png`}
              className={style.logoCenter}
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/muscle.png`}
              className={style.muscleLeft}
            />
          </div>
          <div className={style.loadsDefault}>
            <h4>Loading</h4>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={style.barLoader}>{`${percentage}%`}</div>
      </div>
    </div>
  );
};

export default Loader;
