import styles from './home.module.css';

function Home() {
  const gymPicture = `${process.env.PUBLIC_URL}/assets/images/image-gym.png`;
  const gymCalendarIconTime = `${process.env.PUBLIC_URL}/assets/images/icon-calendar-time.png`;
  const gymCalendarIcon = `${process.env.PUBLIC_URL}/assets/images/icon-calendar.png`;
  const gymIconList = `${process.env.PUBLIC_URL}/assets/images/icon-list.png`;
  const gymIconMessage = `${process.env.PUBLIC_URL}/assets/images/icon-message2.png`;
  const gymImageGym = `${process.env.PUBLIC_URL}/assets/images/image-gym3.png`;
  const gymImageGymOne = `${process.env.PUBLIC_URL}/assets/images/image-gym2.png`;
  const gymImageGymTwo = `${process.env.PUBLIC_URL}/assets/images/image-gym4.png`;
  const gymIconCross = `${process.env.PUBLIC_URL}/assets/images/icon-cross.png`;
  const gymIconTilde = `${process.env.PUBLIC_URL}/assets/images/icon-tilde.png`;

  return (
    <section className={styles.container}>
      <section className={styles.sectionHead}>
        <div className={styles.containerSectionHead}>
          <h1>MEGA ROCKET WEB</h1>
          <h2 id={styles.sectionHeadWelcome}>WELCOME</h2>
          <p>
            Mega Rocket web is a monthly management system for members and trainers so that they can
            dynamically sign up for their activities in the gym
          </p>
        </div>
        <span className={styles.spanSectionHead}>
          <img src={gymPicture} alt="The inside of a gym" />
        </span>
      </section>
      <section className={styles.sectionFeatures}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.sectionFeaturesContainer}>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymCalendarIconTime} alt="Calendar icon with clock" />
              Shift reservations
            </span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymCalendarIcon} alt="Calendar icon" />
              Scheduling & opening hours
            </span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymIconList} alt="List icon" />
              Membership management
            </span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </article>
          <article className={styles.sectionFeaturesArticles}>
            <span className={styles.sectionFeaturesTitles}>
              <img src={gymIconMessage} alt="Message icon" />
              Contact form & suggestions
            </span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.sectionAbout}>
        <h2 className={styles.sectionTitle}>About Mega Rocket</h2>
        <div className={styles.sectionAboutFlexcontainer}>
          <article className={styles.sectionAboutContainer} id={styles.sectionAboutContainerTop}>
            <img src={gymImageGym} alt="The inside of a gym" />
            <p className={styles.sectionAboutTextdesktop}>
              Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
              facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam. Aenean ornare
              velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante
              interdum. Sed nulla amet lorem feugiat tempus aliquam. Aenean ornare velit lacus, ac
              varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla
              amet lorem feugiat tempus aliquam.
            </p>
            <p className={styles.sectionAboutTextmobile}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s (...)
            </p>
            <button>Learn More</button>
          </article>
          <article className={styles.sectionAboutContainer} id={styles.sectionAboutContainerBot}>
            <img
              className={styles.sectionAboutImg}
              src={gymImageGymOne}
              alt="A man running in a treadmill"
            />
            <p className={styles.sectionAboutTextdesktop}>
              Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
              facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam. Aenean ornare
              velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante
              interdum. Sed nulla amet lorem feugiat tempus aliquam. Aenean ornare velit lacus, ac
              varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla
              amet lorem feugiat tempus aliquam.
            </p>
            <p className={styles.sectionAboutTextmobile}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s (...)
            </p>
            <button>Learn More</button>
          </article>
        </div>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Get in Touch</h2>
        <article>
          <form className={styles.sectionTouchForm}>
            <div className={styles.formContainerTop}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input className={styles.formInput} type="text" placeholder="Enter name" />
              </div>
              <div>
                <label htmlFor="firstName">Last Name</label>
                <input className={styles.formInput} type="text" placeholder="Enter last name" />
              </div>
              <div>
                <label htmlFor="emailAddress">Email address</label>
                <input className={styles.formInput} type="text" placeholder="Enter address" />
              </div>
              <div>
                <input className={styles.formButtonTop} type="submit" value="Submit" />
              </div>
            </div>
            <div className={styles.formContainerBottom}>
              <div>
                <label>Contact Reason</label>
                <select>
                  <option value="chose">Chose contact reason</option>
                  <option value="claim">I want to make a claim</option>
                  <option value="suggestion">I want to realize a query or suggestion</option>
                  <option value="membership">I want to know the memberships and costs</option>
                </select>
              </div>
              <div>
                <label>Message</label>
                <textarea name="message" placeholder="Enter your message"></textarea>
              </div>
              <div>
                <input className={styles.formButton} type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </article>
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Gym activities</h2>
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
      <section>
        <h2 className={styles.sectionTitle}>Memberships</h2>
        <article className={styles.sectionMembership}>
          <table className={styles.sectionMembershipTable}>
            <tr className={styles.membershipTable1}>
              <th className={styles.tableTh1}></th>
              <th className={styles.tableTh2}>Only classes</th>
              <th className={styles.tableTh3}>Classic</th>
              <th className={styles.tableTh3}>Black</th>
            </tr>
            <tr>
              <td>Free access to the fitness room</td>
              <td>
                <img src={gymIconCross} alt="Cross icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
            </tr>
            <tr>
              <td>Free access to classes prior enrollment</td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
              <td>
                <img src={gymIconCross} alt="Cross icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
            </tr>
            <tr>
              <td>Personalized followUp by a trainer</td>
              <td>
                <img src={gymIconCross} alt="Cross icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
            </tr>
            <tr>
              <td>Scheduling visualization</td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
              <td>
                <img src={gymIconTilde} alt="Tick icon" />
              </td>
            </tr>
          </table>
        </article>
      </section>
    </section>
  );
}

export default Home;
