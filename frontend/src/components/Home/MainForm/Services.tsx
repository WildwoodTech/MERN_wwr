import Service from "./Service";

interface Props {
  services: IService[];
  mainFormState: IServiceFormState;
  mainFormDispatch: React.Dispatch<any>;
  mainAppDispatch: React.Dispatch<any>;
}

const Services = (props: Props) => {
  const compare = (a: IService, b: IService) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  };
  props.services.sort(compare);

  const sortedServices = props.services.map((service, _index) => {
    return (
      <Service
        mainAppDispatch={props.mainAppDispatch}
        mainFormState={props.mainFormState}
        mainFormDispatch={props.mainFormDispatch}
        _id={service._id}
        time={service.time}
        seats={service.seats}
        key={service._id}
      />
    );
  });

  return <>{sortedServices}</>;
};

export default Services;
