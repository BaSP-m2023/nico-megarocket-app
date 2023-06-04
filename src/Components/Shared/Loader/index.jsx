import style from './loader.module.css';

const Loader = () => {
  return (
    <div className={style.backgroundLoader}>
      <div className={style.containerLoader}>
        <div className={style.loadsRoller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={style.loadsDefault}>
          <h4>Loading</h4>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
