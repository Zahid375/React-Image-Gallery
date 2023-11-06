import { useState } from 'react';
import Gallery from './Gallery';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Gallery />
    </div>
  );
}

export default App;
