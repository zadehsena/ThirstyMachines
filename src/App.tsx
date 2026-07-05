import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MapSection } from './components/MapSection';
import { Methodology } from './components/Methodology';
import { Footer } from './components/Footer';

function App() {
  return (
    <div
      style={{
        background: '#f4f7f9',
        color: '#0f2b3d',
        fontFamily: "'Libre Franklin',system-ui,sans-serif",
        minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Header />
      <Hero />
      <MapSection />
      <Methodology />
      <Footer />
    </div>
  );
}

export default App;
