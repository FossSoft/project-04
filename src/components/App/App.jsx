import { Route, Routes } from 'react-router-dom';
import TrackerPage from 'pages/TrackerPage/TrackerPage';
// import styles from './App.module.css';
// import { EditWaterModal } from 'components/EditWaterModal/EditWaterModal.jsx';

export const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' to element={<HomePage />} /> */}
        {/* <Route path="/signup" to element={<SignUpPage /> } /> */}
        {/* <Route path="/signin" to element={ <SignInPage />} /> */}
        <Route path="/tracker" to element={<TrackerPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};
