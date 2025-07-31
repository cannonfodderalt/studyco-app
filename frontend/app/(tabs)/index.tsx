import { registerRootComponent } from 'expo';
import React from 'react';
import MapWrapper from '@/components/MapWrapper';

const App = () => {
  return <MapWrapper />;
};

export default App;

registerRootComponent(App);
