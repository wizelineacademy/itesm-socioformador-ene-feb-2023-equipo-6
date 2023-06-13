import { Form, Link, useNavigation } from "@remix-run/react";

export default function LoginForm() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <Form method="post" className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900">Welcome!</h5>
        <div className="text-black">
          Enter your examination code provided to log into your personal english
          evaluation exam.
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-90">
            Examination Code
          </label>
          <input
            type="text"
            name="code"
            className="bg-gray-50 border-4 border-b-wizeblue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="XXXX-XXXX"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white bg-wizeblue-100 hover:bg-wizeblue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
        >
          {isSubmitting ? "Authenticating..." : "Log In"}
        </button>
      </Form>
    </div>
  );
}