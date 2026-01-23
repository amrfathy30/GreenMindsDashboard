import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Setting from "./pages/Setting/Setting";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import GamesList from "./pages/games/gamesList";
import AgeGroup from "./pages/Setting/AgeGroup";
import Users from "./pages/Users/Users";
import VideosList from "./pages/videos/videosList";
import Analytics from "./pages/analytics/analyticsList";
import AvatarsList from "./pages/Avatars/avatarsList"
import ChildrenInfo from "./pages/Users/Children/ChildrenInfo/ChildrenInfo";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index path="/" element={<SignIn />} />
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* Pages */}
            <Route path="/videos" element={<VideosList />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/avatars" element={<AvatarsList />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* Others Page */}
            <Route path="/users" element={<Users />} />
            <Route path="/children-info" element={<ChildrenInfo />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/age-group" element={<AgeGroup />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            {/* <Route path="/videos" element={<Videos />} /> */}

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Fallback Route */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
