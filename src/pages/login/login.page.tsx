import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "src/app/services/auth";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../app/slices/authSlice";

type Inputs = {
  username: string;
  password: string;
  rememberMe: boolean;
};

function LoginPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<Inputs>({
    values: {
      username: (localStorage.getItem("username") as string) || "",
      password: "",
      rememberMe: (localStorage.getItem("rememberMe") as string) === "true",
    },
  });
  const [loginUser, { isLoading, error: loginError }] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    void loginUser({ email: data.username, password: data.password })
      .unwrap()
      .then((result) => {
        if (data.rememberMe) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("rememberMe", "true");
        } else {
          removeRememberMe();
        }

        localStorage.setItem("accessToken", result.body.token);

        dispatch(setAuthenticated(true));

        navigate("/profile");
      })
      .catch((error) => {
        console.error("Failed to login", error);
        dispatch(setAuthenticated(false));
      });
  };

  const removeRememberMe = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("rememberMe");
  };

  const onChangeRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      removeRememberMe();
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formErrors.root && <span>This field is required</span>}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
            />
            {formErrors.username && <p>{formErrors.username.message}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            {formErrors.password && <p>{formErrors.password.message}</p>}
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              {...register("rememberMe", {
                onChange: onChangeRememberMe,
              })}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" disabled={isLoading}>
            Sign In
          </button>

          {loginError && (
            <div style={{ color: "red" }}>
              {"status" in loginError && loginError.status === 400 ? (
                <p>Invalid credentials</p>
              ) : (
                <p>Failed to login. Please try again.</p>
              )}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
