import { useAuth } from "../src/context/AuthContext";
import { auth } from "../src/config/firebase";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../src/context/StateContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { resetPsw, logout } = useAuth();
  const { setIsLogged } = useStateContext();

  function handleReset() {
    resetPsw(auth?.currentUser.email);
  }
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
    setIsLogged(false);
  }
  return (
    <div>
      <div className="bg-gray-50 max-w-[800px] m-auto h-[970px] p-6 mt-6 rounded-lg shadow-lg">
        <h1 className="font-semibold text-5xl mb-8 mt-4">Dashboard</h1>
        <div className="leading-10">
          <p>
            Ciao è bello riaverti qui{" "}
            <strong> {auth.currentUser?.email}</strong>!
          </p>
          <p>
            In questa sezione del profilo puoi modificare la password di
            accesso.
          </p>
          <button
            className="bg-primary px-5 rounded-lg my-6"
            onClick={handleReset}
          >
            Clicca qui modificare la password
          </button>

          <p>Contattaci per i tuoi ordini.</p>
          <textarea
            cols={32}
            rows={8}
            className="leading-6 mx-2 my-6 p-4 shadow-lg"
            name="contattaci"
          />
          <button className="flex shadow-inner font-semibold bg-white text-primary outline-primary outline-1 outline px-10 rounded-lg mx-auto">
            Invia
          </button>
        </div>

        <button
          className="bg-primary p-3 mt-28 rounded-lg w-full shadow-inner"
          onClick={handleLogout}
        >
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
