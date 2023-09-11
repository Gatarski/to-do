// this is used for testing async components
export const resolvedComponent = async (component: any, props?: any) => {
  const ComponentResolved = await component(props);
  return () => ComponentResolved;
};

// this is used to standarize whitespaces in strings
export const normalizeWhitespaces = (text: string | null | undefined) =>
  text ? text.replace(/\s+/g, ' ') : text;
