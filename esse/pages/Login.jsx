import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useStateContext } from "../src/context/StateContext";

const Login = () => {
  const emailRef = useRef();
  const pswRef = useRef();
  const navigate = useNavigate();
  const { login, loginGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useStateContext();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, pswRef.current.value);
      if (error === "") {
        navigate("/");
        setIsLogged(true);
      }
    } catch {
      setError("Credenziali errate");
    }
    setLoading(false);
  }

  async function handleGoogle() {
    try {
      setLoading(true);
      await loginGoogle();
      if (error === "") {
        navigate("/");
        setIsLogged(true);
      }
    } catch {
      setError("Credenziali errate");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="bg-gray-50 max-w-96 m-auto h-[470px] p-6 mt-6 rounded-lg shadow-lg">
        <h1 className="font-semibold text-5xl mb-8 mt-4">Accedi</h1>
        {error && (
          <div className="bg-red-400 p-2 rounded-md text-slate-900">
            {error}
          </div>
        )}
        <form className="">
          <div className="mt-7 flex flex-col gap-3">
            <label>Email</label>
            <input
              className="flex px-3 w-full shadow-inner shadow-gray-400 m-auto rounded-md"
              type="email"
              required
              ref={emailRef}
            />
          </div>
          <div className="mt-7 flex flex-col gap-3">
            <label>Password</label>
            <input
              className="flex px-3 w-full shadow-inner shadow-gray-400 m-auto rounded-md"
              type="password"
              required
              ref={pswRef}
            />
          </div>
          <div className="flex mt-16">
            <button
              className="bg-primary w-full  rounded-lg p-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              Accedi
            </button>
            <button onClick={handleGoogle} className="mx-6">
              <FcGoogle size={50} />
            </button>
          </div>
        </form>
        <Link to="/registrati">
          <div className="text-center mt-6">Vuoi creare un account?</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
