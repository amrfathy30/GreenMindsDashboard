/* eslint-disable @typescript-eslint/no-explicit-any */
export function getTranslatedApiError(
  error: any,
  t: (key: string) => string,
  translations: Record<string, string>,
) {
  const serverErrors = error?.response?.data?.Data;
  const serverMessage = error?.response?.data?.Message;

  const normalize = (msg?: string) =>
    msg
      ?.replace(/\s*\(Reference:.*?\)/g, "")
      .replace(/\.$/, "")
      .trim()
      .toLowerCase();

  const findTranslated = (msg?: string) => {
    if (!msg) return undefined;

    const clean = normalize(msg);

    const matchedKey = Object.keys(translations).find((key) =>
      clean?.includes(key.toLowerCase()),
    );

    return matchedKey ? translations[matchedKey] : msg;
  };

  if (Array.isArray(serverErrors) && serverErrors.length) {
    const firstMsg = serverErrors[0];
    return findTranslated(firstMsg) || t("something_went_wrong");
  }

  if (serverErrors && typeof serverErrors === "object") {
    const firstKey = Object.keys(serverErrors)[0];
    const msgFromServer = serverErrors[firstKey]?.[0];
    return findTranslated(msgFromServer) || t("something_went_wrong");
  }

  if (serverMessage) {
    return findTranslated(serverMessage) || t("something_went_wrong");
  }

  return t("something_went_wrong");
}
