import ApiFetcher from "./Apis/ApiFetcher";
import Routing from "./components/Routes/Routing";

function App() {
  return (
    <>
      <div className="bg-white dark:bg-slate-500 dark:text-white ">
        <ApiFetcher>
          <Routing />
        </ApiFetcher>
      </div>
    </>
  );
}

export default App;
