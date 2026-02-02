import { JSX } from "react";
import { hasPermission } from "./permissions";
import UnAuthorized from "../../pages/OtherPage/UnAuthorized";

export const PermissionRoute = ({
  permission,
  element,
}: {
  permission: string;
  element: JSX.Element;
}) => {
  if (!hasPermission(permission)) {
    return <UnAuthorized />;
  }
  return element;
};
