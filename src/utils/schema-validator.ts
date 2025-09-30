type ErrorObject = {
  message?: string;
  [key: string]: ErrorObject | string | undefined;
};

export const getErrorMessageByPropertyName = (
  obj: ErrorObject,
  propertyPath: string
): string | undefined => {
  const properties = propertyPath.split('.');
  let value: ErrorObject | string | undefined = obj;

  for (const prop of properties) {
    if (value && typeof value === 'object' && prop in value) {
      value = value[prop] as ErrorObject;
    } else {
      return undefined;
    }
  }

  // If the final value has a message, return it
  if (value && typeof value === 'object' && 'message' in value) {
    return value.message;
  }

  return undefined;
};
