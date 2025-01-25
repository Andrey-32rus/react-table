import {getSession, signIn} from "next-auth/react";
import {GetServerSideProps} from "next";

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-96 p-5 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <h1 className="mb-4 text-2xl font-semibold text-center">Sign In</h1>
        <div className="mb-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 py-3 font-bold text-white rounded-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;