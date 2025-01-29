import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

// Проверка авторизации на сервере
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/score",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const SignIn = () => {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = (document.getElementById("inputUser") as HTMLInputElement).value;
    const password = (document.getElementById("inputPassword") as HTMLInputElement).value;

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // Отключаем автоматический редирект для отладки
      });

      if (result?.error) {
        console.error("Ошибка авторизации:", result.error);
        alert("Неверный логин или пароль");
      } else {
        window.location.href = "/score"; // Ручной редирект после успешной авторизации
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
      alert("Что-то пошло не так");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputUser"
                    type="text"
                    placeholder="User"
                  />
                  <label htmlFor="inputUser">User Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Password"
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    id="inputRememberPassword"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="inputRememberPassword">
                    Remember Password
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <a className="small">Forgot Password?</a>
                  <button type="submit" className="btn btn-secondary">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                <a>Need an account? Sign up!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;