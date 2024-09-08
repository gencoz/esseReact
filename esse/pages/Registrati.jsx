import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

const Registrati = () => {
  const emailRef = useRef();
  const pswRef = useRef();
  const navigate = useNavigate();
  const pswConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (pswRef.current.value !== pswConfirmRef.current.value) {
      return setError("Password diversa nei due campi");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, pswRef.current.value);
    } catch {
      setError("Errore nella creazione del profilo");
    }
    setLoading(false);
    if (error === "") {
      navigate("/");
    }
  }

  return (
    <div>
      <div className="bg-gray-50 max-w-96 m-auto h-[600px] p-6 mt-6 rounded-lg shadow-lg">
        <h1 className="font-semibold text-5xl mb-8 mt-4">Registrati</h1>
        {error && <alert>{error}</alert>}
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
          <div className="mt-7 flex flex-col gap-3">
            <label>Conferma Password</label>
            <input
              className="flex px-3 w-full shadow-inner shadow-gray-400 m-auto rounded-md"
              type="password"
              required
              ref={pswConfirmRef}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-primary w-full mt-10 rounded-lg p-3"
            disabled={loading}
          >
            Registrati
          </button>
        </form>
        <Link to="/login">
          <div className="text-center mt-12 text-sm">
            Sei già registrato?{" "}
            <span className="font-semibold">Clicca qui</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Registrati;
