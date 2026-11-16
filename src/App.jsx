import "@/lib/installPrompt";
import { lazy, Suspense, Component } from "react";
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from "next-themes";
// Add page imports here
import Layout from "@/components/Layout";
const BuildPaths = lazy(() => import("@/pages/BuildPaths"));
const SystemDesignSyllabus = lazy(() => import("@/pages/SystemDesignSyllabus"));
const CurriculumPrint = lazy(() => import("@/pages/CurriculumPrint"));
const OfflineLibrary = lazy(() => import("@/pages/OfflineLibrary"));
const Home = lazy(() => import("@/pages/Home"));
const Subject = lazy(() => import("@/pages/Subject"));
const Topic = lazy(() => import("@/pages/Topic"));
const QuizHub = lazy(() => import("@/pages/QuizHub"));
const QuizRunner = lazy(() => import("@/pages/QuizRunner"));
const DSAIndex = lazy(() => import("@/pages/DSAIndex"));
const DSAHub = lazy(() => import("@/pages/DSAHub"));
const DSAVisualizer = lazy(() => import("@/pages/DSAVisualizer"));
const BehavioralStudio = lazy(() => import("@/pages/BehavioralStudio"));
const Resources = lazy(() => import("@/pages/Resources"));
const Cheatsheets = lazy(() => import("@/pages/Cheatsheets"));
const Roadmap = lazy(() => import("@/pages/Roadmap"));
const ComplexityReference = lazy(() => import("@/pages/ComplexityReference"));
const TrickyQuestions = lazy(() => import("@/pages/TrickyQuestions"));
const ProgressData = lazy(() => import("@/pages/ProgressData"));
const Auth = lazy(() => import("@/pages/Auth"));
import LocalAuthGate from "@/components/LocalAuthGate";

class PageLoadBoundary extends Component {
  state = {failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<div role="alert" className="p-6">This page could not load. Reconnect to retry, or return to the offline library. <a className="underline" href={`${import.meta.env.BASE_URL}offline`}>Offline library</a>. <button className="underline" onClick={()=>location.reload()}>Reload to retry</button></div>:this.props.children;}
}
function RouteLoadBoundary({children}) {
  const {pathname, search} = useLocation();
  return <PageLoadBoundary key={pathname + search}>{children}</PageLoadBoundary>;
}
const AuthenticatedApp = () => {
  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route path="/login" element={<Auth />} />
      <Route element={<LocalAuthGate />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/subject/:id" element={<Subject />} />
          <Route path="/subject/:id/:topicId" element={<Topic />} />
          <Route path="/quiz" element={<QuizHub />} />
          <Route path="/quiz/run" element={<QuizRunner />} />
          <Route path="/dsa" element={<DSAIndex />} />
          <Route path="/dsa/hub" element={<DSAHub />} />
          <Route path="/dsa/:viz" element={<DSAVisualizer />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/interviews/behavioral" element={<BehavioralStudio />} />
          <Route path="/cheatsheets" element={<Cheatsheets />} />
          <Route path="/build" element={<BuildPaths />} />
          <Route path="/build/os" element={<BuildPaths />} />
          <Route path="/build/os/:unitId" element={<BuildPaths />} />
          <Route path="/system-design" element={<SystemDesignSyllabus />} />
          <Route path="/print/:id" element={<CurriculumPrint />} />
          <Route path="/offline" element={<OfflineLibrary />} />
          <Route path="/progress" element={<ProgressData />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/complexity" element={<ComplexityReference />} />
          <Route path="/tricky" element={<TrickyQuestions />} />
          <Route path="/tricky/:subjectId" element={<TrickyQuestions />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <RouteLoadBoundary><Suspense fallback={null}><AuthenticatedApp /></Suspense></RouteLoadBoundary>
        </Router>
        <Toaster />
    </ThemeProvider>
  )
}

export default App