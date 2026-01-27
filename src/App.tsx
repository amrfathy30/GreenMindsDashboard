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
import LoginStreaks from "./pages/Setting/LoginStreaks/LoginStreaks";
import { ProtectedRoute } from "./protected-route-wrapper";
import AdminRoles from "./pages/Setting/AdminRoles/AdminRolesList";
import PermissionsList from "./pages/Setting/Permissions/PermissionsList";
import UpdatePermission from "./pages/Setting/Permissions/UpdatePermissionModal";

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
              <Route path="/videos" element={<VideosList />} />
              <Route path="/games" element={<GamesList />} />
              <Route path="/avatars" element={<AvatarsList />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/children-info" element={<ChildrenInfo />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/age-group" element={<AgeGroup />} />
              <Route path="/admin-roles" element={<AdminRoles />} />
              <Route path="/profile-levels" element={<ProfileLevels />} />
              <Route path="/login-streaks" element={<LoginStreaks />} />
              <Route path="/permissions-list" element={<PermissionsList />} />
              <Route path="/update-permission" element={<UpdatePermission />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
