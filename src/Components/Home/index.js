import styles from './home.module.css';
import { FormLand } from 'Components/Shared';

function Home() {
  const gymCalendarIconTime = `${process.env.PUBLIC_URL}/assets/images/icon-calendar-time.png`;
  const gymCalendarIcon = `${process.env.PUBLIC_URL}/assets/images/icon-calendar.png`;
  const gymIconList = `${process.env.PUBLIC_URL}/assets/images/icon-list.png`;
  const gymIconMessage = `${process.env.PUBLIC_URL}/assets/images/icon-message2.png`;
  const gymImageGym = `${process.env.PUBLIC_URL}/assets/images/dumbells.jpg`;
  const gymImageGymOne = `${process.env.PUBLIC_URL}/assets/images/gym-sports.jpg`;
  const gymImageGymTwo = `${process.env.PUBLIC_URL}/assets/images/youngers-training.jpg`;
  const logo = `${process.env.PUBLIC_URL}/assets/images/logo.png`;

  return (
    <section className={styles.container}>
      <section className={styles.sectionHead}>
        <div className={styles.containerSectionHead}>
          <img src={logo} alt="Rocket logo" />
          <h1 className={styles.Title}>MEGA ROCKET WEB</h1>
          <h2 id={styles.sectionHeadWelcome}>WELCOME</h2>
          <p className={styles.Text}>
            Mega Rocket web is a monthly management system for members and trainers so that they can
            dynamically sign up for their activities in the gym
          </p>
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
            <img src={gymImageGym} alt="The inside of a gym" />
            <p className={styles.sectionAboutTextDesktop}>
              We are Mega Rocket web, one of the oldest but most modern gyms in the region, with a
              unique monthly management system for members and trainers in the country, so they can
              access our gym dynamically. The best version of you awaits, join our Mega Rocket
              today.
            </p>
            <p className={styles.sectionAboutTextMobile}>
              We are Mega Rocket web, one of the oldest but most modern gyms in the region, with a
              unique monthly management system for members and trainers. (...)
            </p>
            <button>Learn More</button>
          </article>
          <article className={styles.sectionAboutContainer} id={styles.sectionAboutContainerBot}>
            <img
              className={styles.sectionAboutImg}
              src={gymImageGymOne}
              alt="A man running in a treadmill"
            />
            <p className={styles.sectionAboutTextDesktop}>
              On this website you will have at your disposal the possibility of taking our classes,
              directed by our best personal trainers and accessing many privileges through our
              different memberships. We are here to help you achieve your best quality of life in a
              fun daily activity at our facilities.
            </p>
            <p className={styles.sectionAboutTextMobile}>
              On this website you will have at your disposal the possibility of taking our classes,
              directed by our best personal trainers and accessing many privileges (...)
            </p>
            <button>Learn More</button>
          </article>
        </div>
      </section>
      <section className={styles.sectionFeatures}>
        <h2 className={styles.sectionTitleWhite}>Features</h2>
        <div className={styles.sectionFeaturesContainer}>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymCalendarIconTime} alt="Calendar icon with clock" />
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
              <img src={gymCalendarIcon} alt="Calendar icon" />
              Scheduling & opening hours
            </span>
            <p className={styles.Text}>
              As an associate you will be able to access our best gym classes from Monday to
              Saturday, from 8 am to 5 pm with the best personal trainers.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymIconList} alt="List icon" />
              Membership management
            </span>
            <p className={styles.Text}>
              You will have three types of memberships available in our facilities to access a wide
              variety of benefits for your personal well-being and daily activity.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymIconMessage} alt="Message icon" />
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
            <div className={styles.activitiesListTop}>
              <li>Crossfit</li>
              <li>Spinning</li>
              <li>Functional</li>
            </div>
            <div className={styles.activitiesListBot}>
              <li>Fitness</li>
              <li>Boxing</li>
            </div>
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
            <div className={styles.cardTitle}>Only Classes</div>
            <div className={styles.cardBody}>
              <ul>
                <li>Free access to classes prior enrollment</li>
                <li>Scheduling visualization</li>
              </ul>
            </div>
            <div className={styles.cardInfo}>More info</div>
          </div>
          <div className={styles.cardMembership}>
            <div className={styles.cardTitle}>Classic</div>
            <div className={styles.cardBody}>
              <ul>
                <li>Free access to the fitness room</li>
                <li>Personalized followUp by a trainer</li>
                <li>Scheduling visualization</li>
              </ul>
            </div>
            <div className={styles.cardInfo}>More info</div>
          </div>
          <div className={styles.cardMembership}>
            <div className={styles.cardTitle}>Black</div>
            <div className={styles.cardBody}>
              <ul>
                <li>Free access to classes prior enrollment</li>
                <li>Free access to classes prior enrollment</li>
                <li>Free access to the fitness room</li>
                <li>Personalized followUp by a trainer</li>
                <li>Scheduling visualization</li>
              </ul>
            </div>
            <div className={styles.cardInfo}>More info</div>
          </div>
        </article>
      </section>
      <section className={styles.getInTouch}>
        <h2 className={styles.sectionTitleBlue}>Get in Touch</h2>
        <article>
          <FormLand />
        </article>
      </section>
    </section>
  );
}

export default Home;
