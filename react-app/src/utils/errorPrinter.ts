function errorPrinter(scenario: string) {
  return (error: any) => {
    console.error(`${scenario} failed with`, error);
  };
}

export default errorPrinter;
