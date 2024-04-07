import headerGraphic from "../../assets/images/header-re.svg";

const HomeHeader = () => {
  return (
    <div className="home_header">
      <img
        className="home_header-graphic"
        src={headerGraphic}
        alt="main-logo"
      />
    </div>
  );
};

export default HomeHeader;
