import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import Nav from './Nav'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
