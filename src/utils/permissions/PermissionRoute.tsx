import { JSX } from "react";
import NotFound from "../../pages/OtherPage/NotFound";
import { hasPermission } from "./permissions";

export const PermissionRoute = ({
  permission,
  element,
}: {
  permission: string;
  element: JSX.Element;
}) => {
  if (!hasPermission(permission)) {
    return <NotFound />;
  }
  return element;
};
