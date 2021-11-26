import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header'
import BodyComponent from './components/bodyComponent'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div id='main-content'>
          <Header />
          <BodyComponent />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
