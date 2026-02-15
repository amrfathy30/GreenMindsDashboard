export function getTranslatedApiError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  t: (key: string) => string,
  translations: Record<string, string>,
) {
  const serverErrors = error?.response?.data?.Data;
  const serverMessage = error?.response?.data?.Message;

  if (serverErrors && typeof serverErrors === "object") {
    const firstKey = Object.keys(serverErrors)[0];
    const msgFromServer = serverErrors[firstKey]?.[0];
    return (
      translations[msgFromServer] || msgFromServer || t("something_went_wrong")
    );
  }

  if (serverMessage) {
    return translations[serverMessage] || serverMessage;
  }

  return t("something_went_wrong");
}
