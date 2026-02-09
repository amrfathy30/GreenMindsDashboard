import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Setting from "./pages/Setting/Setting";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import GamesList from "./pages/games/gamesList";
import AgeGroup from "./pages/Setting/AgeGroup/AgeGroupList";
import Users from "./pages/Users/Users";
import VideosList from "./pages/videos/videosList";
import Analytics from "./pages/analytics/analyticsList";
import AvatarsList from "./pages/Avatars/avatarsList";
import ChildrenInfo from "./pages/Users/Children/ChildrenInfo/ChildrenInfo";
import ProfileLevels from "./pages/Setting/ProfileLevels/ProfileLevels";
import { ProtectedRoute } from "./protected-route-wrapper";
import AdminRoles from "./pages/Setting/AdminRoles/AdminRolesList";
import PermissionsList from "./pages/Setting/Permissions/PermissionsList";
import { PermissionRoute } from "./utils/permissions/PermissionRoute";
import Welcome from "./pages/Welcome/Welcome";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index path="/" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<AppLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/videos"
                element={
                  <PermissionRoute
                    permission="Videos_GetPaged"
                    element={<VideosList />}
                  />
                }
              />

              <Route
                path="/games"
                element={
                  <PermissionRoute
                    permission="Games_GetPaged"
                    element={<GamesList />}
                  />
                }
              />

              <Route
                path="/avatars"
                element={
                  <PermissionRoute
                    permission="Avatars_GetPaged"
                    element={<AvatarsList />}
                  />
                }
              />

              <Route
                path="/children-info/:id"
                element={
                  <PermissionRoute
                    permission="Children_GetChild"
                    element={<ChildrenInfo />}
                  />
                }
              />

              <Route
                path="/admin-roles"
                element={
                  <PermissionRoute
                    permission="AdminRoles_GetAllRoles"
                    element={<AdminRoles />}
                  />
                }
              />

              <Route
                path="/profile-levels"
                element={
                  <PermissionRoute
                    permission="Levels_GetAll"
                    element={<ProfileLevels />}
                  />
                }
              />

              <Route
                path="/permissions-list"
                element={
                  <PermissionRoute
                    permission="AdminPermissions_GetAllPermissions"
                    element={<PermissionsList />}
                  />
                }
              />

              <Route
                path="/age-group"
                element={
                  <PermissionRoute
                    permission="AgeSectors_GetAll"
                    element={<AgeGroup />}
                  />
                }
              />

              <Route path="/users" element={<Users />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
