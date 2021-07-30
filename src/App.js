import Header from "./Components/Header";
import People from "./Components/People";

function App() {
  return (
    <>
      {/* Header of the page */}

      <Header title="Splitwise Clone"></Header>

      {/* Main content of the page */}

      <div className="contents">
        <People />
      </div>
    </>
  );
}

export default App;
