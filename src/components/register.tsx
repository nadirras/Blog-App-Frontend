"use client";
import { registerAuthor } from "@/lib/apiAuthor";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  name: yup.string().required("name required"),
  email: yup.string().email("invalid email").required("email required"),
  password: yup
    .string()
    .min(4, "password must be at least 4 characters")
    .required("password required"),
});

export default function RegisterForm() {
  const onRegister = async (data: any) => {
    try {
      await registerAuthor(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, action) => {
        console.log(values);
        onRegister(values);
        action.resetForm();
      }}
    >
      {() => {
        return (
          <Form>
            <div className="h-screen flex justify-center items-center flex-col">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Register
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
              <div className="mt-10">
                <label className="block text-sm font-medium leading-6 text-primary">
                  Name
                </label>
                <div className="mt-2">
                  <Field
                    name="name"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component={"div"}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-primary">
                  Email
                </label>
                <div className="mt-2">
                  <Field
                    name="email"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component={"div"}
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-primary">
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 p-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component={"div"}
                    className="text-sm text-neutral"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 p-3 text-sm font-medium rounded-md bg-primary"
              >
                Register
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
