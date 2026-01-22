import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectManager from './pages/ProjectManager';
import SkillManager from './pages/SkillManager';
import EducationManager from './pages/EducationManager';
import ExperienceManager from './pages/ExperienceManager';

import AboutManager from './pages/AboutManager';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<AboutManager />} />
          <Route path="/projects" element={<ProjectManager />} />
          <Route path="/skills" element={<SkillManager />} />
          <Route path="/education" element={<EducationManager />} />
          <Route path="/experience" element={<ExperienceManager />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
