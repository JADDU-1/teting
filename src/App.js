import * as yup from "yup";
import { Formik, Form, Field } from "formik";

import "./styles.css";

yup.addMethod(yup.string, "specialurlvalidation", function (schemas, msg) {
  return this.test({
    name: "specialurlvalidation",
    message: msg,
    test: (value) => {
      if (Array.isArray(schemas) && schemas.length > 1) {
        const resee = schemas.map((schema) => schema.isValidSync(value));
        return resee.some((res) => res);
      } else {
        throw new TypeError("Schemas is not correct array schema");
      }
    },
    exclusive: false
  });
});

const validationSchema = yup.object().shape({
  urlvalidation: yup
    .string()
    .specialurlvalidation(
      [yup.string().matches("NA"), yup.string().url()],
      "Enter valid url or NA"
    )
    .required("enter the value")
});

const Example = () => (
  <Formik
    initialValues={{
      urlvalidation: ""
    }}
    validationSchema={validationSchema}
    onSubmit={console.log}
  >
    {({ errors }) => (
      <Form>
        <label htmlFor="urlvalidation">
          special field 
        </label>
        <Field name="urlvalidation" />
        {errors.urlvalidation ? (
          <div style={{ color: "red" }}>{errors.urlvalidation}</div>
        ) : null}
        <br />
        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default function App() {
  return (
    <div className="App">
      <Example />
    </div>
  );
}
