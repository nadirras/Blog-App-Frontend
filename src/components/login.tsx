"use client";

import { loginAuthor } from "@/lib/apiAuthor";
import { useAppDispatch } from "@/lib/features/hooks";
import { setUser } from "@/lib/features/author/authorSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email required"),
  password: yup
    .string()
    .min(4, "password must at least 4 characters")
    .required("password required"),
});

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onLogin = async (data: any) => {
    try {
      const res = await loginAuthor(data);
      localStorage.setItem("token", res.token);
      dispatch(setUser(res.author));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, action) => {
        console.log(values);
        onLogin(values);
        action.resetForm();
      }}
    >
      {() => {
        return (
          <Form>
            <div className="h-screen flex justify-center items-center flex-col">
              <h1 className="text-3xl font-bold">Login</h1>
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <Field
                    name="email"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component={"div"}
                    className="text-sm text-secondary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component={"div"}
                    className="text-sm text-secondary"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 p-3 text-sm font-medium rounded-md bg-primary "
              >
                Login
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
