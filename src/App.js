import Nav from "./components/Navigation/Nav";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { Circles } from  'react-loader-spinner'
import "../src/App.scss";

function App() {

  const [account, setAccount] = useState({});
  const {user} = useContext(UserContext);

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if(session) {
      setAccount(JSON.parse(session));
    }
  }, []);


  return (
    <>
      {
        user && user.isLoading ?
        
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="loading-container"
          visible={true}
          
        />
          :
          <>
            <div className="app-header">
              <Nav />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
      }

      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />

    </>
  );
}

export default App;
