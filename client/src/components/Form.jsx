import React from "react";
import Button from "./Button";

const Form = ({ children, onSubmit, headingtxt, paragraphtxt, btntxt }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
    >
      <h1 className="text-white text-2xl font-semibold text-center mb-4">
        {headingtxt}
      </h1>
      <p className="text-center mb-6 text-indigo-300">{paragraphtxt}</p>
      {children}
      <Button type="submit">{btntxt}</Button>
    </form>
  );
};

export default Form;
