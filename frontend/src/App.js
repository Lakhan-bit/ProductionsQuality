import "./App.css";
import ProductionTracking from "./components/ProductionTracking";
import QualityControl from "./components/QualityControl";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Manufacturing Execution System (MES)</h1>
      </header>
      <div className="dashboard">
        <div className="dashboard-intro">
          <h2 className="dashboard-title">Dashboard</h2>
          <p className="dashboard-description">
            Welcome to the MES Dashboard. Use the modules below to manage
            production and quality control.
          </p>
        </div>
        <ProductionTracking />
        <QualityControl />
      </div>
    </div>
  );
}

export default App;