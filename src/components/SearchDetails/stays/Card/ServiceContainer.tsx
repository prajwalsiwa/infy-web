interface servicePropsTypes {
  service: string;
}

function ServiceContainer({ service }: servicePropsTypes) {
  return <div className="py-0.5 px-2 w-fit h-fit border border-grey-500 rounded-sm text-[0.75rem] text-grey-800">{service}</div>;
}

export default ServiceContainer;
