import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WidgetGalleryModal from './modals/WidgetGalleryModal';
import MyCustomWidget from './widgets/MyCustomWidget';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyCustomWidget />} />
          <Route path="/widget-gallery" element={<WidgetGalleryModal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
