import logo from './logo.svg';
import './App.css';
import UserDashboard from '../src/userDashboardwithActivityStats/UserDashboard'
import ProductViewer from './productSearchandDetailsViewer/ProductViewer';
function App() {
  return (
    <div className="App">
        <UserDashboard />
        <ProductViewer/>
    </div>
  );
}

export default App;
