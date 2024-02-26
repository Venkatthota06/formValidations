import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
  useWatch,
  Control,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import "./FormValidations.css";

interface FormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  Govt_issued_ID_type: string;
  Govt_Issued_id: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

const FormValidations = () => {
  const [step, setStep] = useState<number>(1);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .required("Name is required"),
    age: yup.number().required("Age is required"),
    sex: yup.string().required("Sex is required"),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, "Mobile must be 10 digits.")
      .required("Mobile is required"),
    Govt_issued_ID_type: yup
      .string()
      .required("Govt Issued ID Type is required"),
    Govt_Issued_id: yup
      .string()
      .test("aadhar-or-pan", "Invalid ID", function (value) {
        const idType = this.resolve(yup.ref("Govt_issued_ID_type"));
        if (idType === "aadhar") {
          return value === undefined || value.length === 12;
        } else if (idType === "pan") {
          return value === undefined || value.length === 10;
        }
        return true;
      }),
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: "",
      age: 0,
      sex: "",
      mobile: "",
      Govt_issued_ID_type: "",
      Govt_Issued_id: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);
  const watchGovt_issued_ID_type = useWatch({
    control,
    name: "Govt_issued_ID_type",
    defaultValue: "",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSubmittedData([...submittedData, data]);
    setStep(1);
    reset();
  };

  const onNextStep = () => {
    setStep(2);
  };

  const onPrevStep = () => {
    setStep(1);
  };

  return (
    <div className="App">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {step === 1 && (
            <>
              <h1>Personal Details</h1>
              <Controller
                name="name"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="age"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Age"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />
              <Controller
                name="sex"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <Select {...field} label="Sex" error={!!errors.sex}>
                    <MenuItem value="">Select Sex</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                )}
              />
              <Controller
                name="mobile"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mobile"
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                  />
                )}
              />
              <Controller
                name="Govt_issued_ID_type"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Govt Issued ID Type"
                    error={!!errors.Govt_issued_ID_type}
                  >
                    <MenuItem value="">Select Govt Issued ID Type</MenuItem>
                    <MenuItem value="aadhar">Aadhar</MenuItem>
                    <MenuItem value="pan">PAN</MenuItem>
                  </Select>
                )}
              />
              {watchGovt_issued_ID_type === "aadhar" && (
                <Controller
                  name="Govt_Issued_id"
                  control={control as Control<FormData>}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Aadhar Number"
                      error={!!errors.Govt_Issued_id}
                      helperText={errors.Govt_Issued_id?.message}
                    />
                  )}
                />
              )}
              {watchGovt_issued_ID_type === "pan" && (
                <Controller
                  name="Govt_Issued_id"
                  control={control as Control<FormData>}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="PAN Number"
                      error={!!errors.Govt_Issued_id}
                      helperText={errors.Govt_Issued_id?.message}
                    />
                  )}
                />
              )}
              {/* <Button type="submit" disabled={!methods.formState.isValid}>Next</Button> */}
              <Button
                type="button"
                onClick={() => onNextStep()} // Change this line
                disabled={!methods.formState.isValid}
              >
                Next
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <h1>Address Details</h1>
              <Controller
                name="address"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
              <Controller
                name="state"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
              <Controller
                name="city"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
              <Controller
                name="country"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
              <Controller
                name="pincode"
                control={control as Control<FormData>}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pincode"
                    error={!!errors.pincode}
                    helperText={errors.pincode?.message}
                  />
                )}
              />
              <Button onClick={onPrevStep}>Previous</Button>
              <Button type="submit" disabled={!methods.formState.isValid}>
                Submit
              </Button>
            </>
          )}
        </form>
      </FormProvider>
      {submittedData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Govt Issued ID Type</th>
              <th>Govt Issued ID</th>
              <th>Address</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data: FormData, index: number) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.sex}</td>
                <td>{data.mobile}</td>
                <td>{data.Govt_issued_ID_type}</td>
                <td>{data.Govt_Issued_id}</td>
                <td>{data.address}</td>
                <td>{data.state}</td>
                <td>{data.city}</td>
                <td>{data.country}</td>
                <td>{data.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormValidations;
