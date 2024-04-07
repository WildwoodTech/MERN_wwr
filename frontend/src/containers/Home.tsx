import HomeHeader from "../components/Home/HomeHeader";
import MainApp from "../components/Home/MainApp";

const Home = () => {
  return (
    <div className="home">
      <HomeHeader />
      <div className="header-info">
        <div>
          <p>
            “In addition to our four services listed below, we will also be
            holding a Sunrise Service at 6:30am at the Yucaipa Community Park.
            This service does not require a reservation.
          </p>
          <p>
            Please select which of our reservable Easter services you plan to
            attend, and note that sixth grade and above will be joining us in
            our main services. We look forward to celebrating our Risen Savior
            together!"
          </p>
        </div>
      </div>
      <MainApp />
    </div>
  );
};

export default Home;
