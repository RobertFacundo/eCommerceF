import React, {useState} from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const LoginRegister = ()=>{
    const {login, register, loading, error} = useAuth();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email:"",
    });

    const handleChange = (e)=>{
        setFormData(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const payload = {
                username: formData.username,
                password: formData.password,
            };
            if(isRegister) payload.email = formData.email;

            console.log("📦 Payload enviado:", payload);

            if(isRegister){
              await register(payload);

              const loginRes = await login({
                username: payload.username,
                password: payload.password,
              });
              console.log("✅ Login después del registro", loginRes);
              navigate('/Home');
            }else{
                const loginRes = await login(payload);
                console.log("✅ Login directo", loginRes);
                navigate("/Home")
            }

        }catch (error){
            console.error("❌ Auth error:", error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>{isRegister ? "Register" : "Login"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <br />

                {isRegister && (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <br />
                  </>
                )}

                <input 
                  type="password" 
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  required  
                />
                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : isRegister ? "Register" : "Login"}
                </button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}

            <p>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{""}
                <button type="button" onClick={()=> setIsRegister(!isRegister)}>
                    {isRegister ? 'Login': 'Register'}
                </button>
            </p>
        </div>
    )
}

export default LoginRegister;