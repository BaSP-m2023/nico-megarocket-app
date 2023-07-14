import { useHistory } from 'react-router-dom';
import styles from './home.module.css';
import { FormLand } from 'Components/Shared';

function Home() {
  const gymCalendarIconTime = `${process.env.PUBLIC_URL}/assets/images/reservation.svg`;
  const gymCalendarIcon = `${process.env.PUBLIC_URL}/assets/images/calendarHome.svg`;
  const gymIconList = `${process.env.PUBLIC_URL}/assets/images/membership.svg`;
  const gymIconMessage = `${process.env.PUBLIC_URL}/assets/images/contact.svg`;
  const runMachine = `${process.env.PUBLIC_URL}/assets/images/run-machine.jpg`;
  const gymImageGymOne = `${process.env.PUBLIC_URL}/assets/images/gym-sports.jpg`;
  const gymImageGymTwo = `${process.env.PUBLIC_URL}/assets/images/youngers-training.jpg`;
  const checkIcon = `${process.env.PUBLIC_URL}/assets/images/check.svg`;
  const logo = `${process.env.PUBLIC_URL}/assets/images/logo.png`;
  const history = useHistory();

  return (
    <section className={styles.container}>
      <section className={styles.sectionHead}>
        <div className={styles.containerSectionHead}>
          <div className={styles.content}>
            <img className={styles.rocketLogo} src={logo} alt="Rocket logo" />
            <h1 className={styles.title}>welcome to the mega rocket family</h1>
            <p className={styles.Text}>
              Mega Rocket web is a monthly management system for members and trainers so that they
              can dynamically sign up for their activities in the gym
            </p>
          </div>
          <video className={styles.bannerVideo} autoPlay loop muted>
            <source src="/assets/video/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className={styles.sectionAbout}>
        <h2 className={styles.sectionTitleBlue}>About Mega Rocket</h2>
        <div className={styles.sectionAboutFlexContainer}>
          <article className={styles.sectionAboutContainer} id={styles.sectionAboutContainerTop}>
            <img src={runMachine} className={styles.sectionAboutImage} alt="The inside of a gym" />
            <p className={styles.sectionAboutTextDesktop}>
              We are Mega Rocket web, one of the oldest but most modern gyms in the region, with a
              unique monthly management system for members and trainers in the country, so they can
              access our gym dynamically. The best version of you awaits, join our Mega Rocket
              today.
            </p>
          </article>
          <div className={styles.divider}></div>
          <article className={styles.sectionAboutContainerTwo} id={styles.sectionAboutContainerBot}>
            <img
              className={styles.sectionAboutImage}
              src={gymImageGymOne}
              alt="A man running in a treadmill"
            />
            <p className={styles.sectionAboutTextDesktop}>
              On this website you will have at your disposal the possibility of taking our classes,
              directed by our best personal trainers and accessing many privileges through our
              different memberships. We are here to help you achieve your best quality of life in a
              fun daily activity at our facilities.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.sectionFeatures}>
        <h2 className={styles.sectionTitleWhite}>Features</h2>
        <div className={styles.sectionFeaturesContainer}>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img
                src={gymCalendarIconTime}
                alt="Calendar icon with clock"
                className={styles.featuresIcons}
              />
              Shift reservations
            </span>
            <p className={styles.Text}>
              As an associate of our facilities you will be able to make reservations to our classes
              with our trainers available, during a large part of the week, in a wide availability
              of hours per day.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymCalendarIcon} alt="Calendar icon" className={styles.featuresIcons} />
              Scheduling & opening hours
            </span>
            <p className={styles.Text}>
              As an associate you will be able to access our best gym classes from Monday to
              Saturday, from 8 am to 5 pm with the best personal trainers.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymIconList} alt="List icon" className={styles.featuresIcons} />
              Membership management
            </span>
            <p className={styles.Text}>
              You will have three types of memberships available in our facilities to access a wide
              variety of benefits for your personal well-being and daily activity.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymIconMessage} alt="Message icon" className={styles.featuresIcons} />
              Contact form & suggestions
            </span>
            <p className={styles.Text}>
              If you happen to have a question that we can answer, or if you have any suggestions
              for us, please contact us via email.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.activities}>
        <h2 className={styles.sectionTitleBlue}>Gym activities</h2>
        <article className={styles.sectionActivities}>
          <ul className={styles.sectionActivitiesList}>
            <li className={styles.activityItem}>Crossfit</li>
            <li className={styles.activityItem}>Spinning</li>
            <li className={styles.activityItem}>Functional</li>
            <li className={styles.activityItem}>Fitness</li>
            <li className={styles.activityItem}>Boxing</li>
          </ul>
          <img
            className={styles.sectionActivitiesImg}
            src={gymImageGymTwo}
            alt="The inside of a gym"
          />
        </article>
      </section>
      <section className={styles.memberships}>
        <h2 className={styles.sectionTitleWhite}>Memberships</h2>
        <article className={styles.sectionMembership}>
          <div className={styles.cardMembership}>
            <h5 className={styles.cardTitle}>Only Classes</h5>
            <div className={styles.cardBody}>
              <ul className={styles.benefitsList}>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Free access to classes prior enrollment</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Scheduling visualization</p>
                </li>
              </ul>
            </div>
            <div onClick={() => history.push('/auth/sign-up')} className={styles.cardInfo}>
              More info
            </div>
          </div>
          <div className={styles.cardMembership}>
            <h5 className={styles.cardTitle}>Classic</h5>
            <div className={styles.cardBody}>
              <ul className={styles.benefitsList}>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Free access to the fitness room</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Personalized followUp by a trainer</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Scheduling visualization</p>
                </li>
              </ul>
            </div>
            <div onClick={() => history.push('/auth/sign-up')} className={styles.cardInfo}>
              More info
            </div>
          </div>
          <div className={styles.cardMembership}>
            <h5 className={styles.cardTitle}>Black</h5>
            <div className={styles.cardBody}>
              <ul className={styles.benefitsList}>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Free access to classes prior enrollment</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Free access to classes prior enrollment</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Free access to the fitness room</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Personalized followUp by a trainer</p>
                </li>
                <li>
                  <img src={checkIcon} className={styles.checkIcon} />
                  <p>Scheduling visualization</p>
                </li>
              </ul>
            </div>
            <div onClick={() => history.push('/auth/sign-up')} className={styles.cardInfo}>
              More info
            </div>
          </div>
        </article>
      </section>
      <section className={styles.getInTouch}>
        <h2 className={styles.sectionTitleBlue}>Get in Touch</h2>
        <article>
          <FormLand />
        </article>
      </section>
      <section className={styles.info}>
        <div className={styles.card}>
          <h4 className={styles.findUs}>Contact & Where to find us</h4>
          <div className={styles.infoContainer}>
            <p className={styles.ubication}>Rosario: Direccion 1234 - +54 341-4569878</p>
            <p className={styles.ubication}>Montevideo: Direccion 1234 - +598 11-3489838</p>
            <p className={styles.ubication}>radiumrocket@gmail.com</p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
