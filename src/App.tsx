import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CapstonePage } from './pages/CapstonePage';
import { HomePage } from './pages/HomePage';
import { NodePage } from './pages/NodePage';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/node/:nodeId" element={<NodePage />} />
        <Route path="/capstone/:capstoneId" element={<CapstonePage />} />
      </Routes>
    </BrowserRouter>
  );
}
