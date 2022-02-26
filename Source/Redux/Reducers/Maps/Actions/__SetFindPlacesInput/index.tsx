const Index = (input: string) => {
  return {
    type: "findPlacesInput",
    payload: input,
  };
};

export default Index;
