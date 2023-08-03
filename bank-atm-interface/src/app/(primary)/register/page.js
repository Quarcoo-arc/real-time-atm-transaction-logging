"use client";
import React, { useState } from "react";
import { AuthPage } from "@/sharedPages";
import registerImg from "../../../../public/register_img.jpg";
import { ContentWrapper, WrapAndCenter } from "@/components/Wrappers";
import { FormButton, Heading, OutlinedTextField } from "@/components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { BackComponent } from "./page.styled";
import { useUser } from "../../UserContext";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({});
  const [secondForm, setSecondForm] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { registerUserHandler } = useUser();
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setUserInfo((prev) => ({
        ...prev,
        email: values.email,
        password: values.password,
      }));
      setSecondForm(true);
    },
  });

  const secondValidationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    atm_pin: yup
      .string()
      .required("Enter your PIN")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(4, "Must be exactly 4 digits")
      .max(4, "Must be exactly 4 digits"),
    confirm_atm_pin: yup
      .string()
      .oneOf([yup.ref("atm_pin"), null], "PINs must match"),
  });

  const secondFormik = useFormik({
    initialValues: {
      name: "",
      atm_pin: "",
      confirm_atm_pin: "",
    },
    validationSchema: secondValidationSchema,
    onSubmit: async (values) => {
      const result = await registerUserHandler({
        email: userInfo.email,
        password: userInfo.password,
        name: values.name,
        pin: values.atm_pin,
      });

      if (result.success) {
        router.push("/register/success");
      } else {
        setDisplayAlert(true);
        setErrorMessage(
          result.error && result.error.message
            ? result.error.message
            : result.message
            ? result.message
            : "Something went wrong."
        );
      }
    },
  });
  return (
    <AuthPage
      btnType="login"
      src={registerImg}
      setOpenSnackBar={setDisplayAlert}
      alertMessage={errorMessage}
      openSnackBar={displayAlert}
    >
      <ContentWrapper>
        <div>
          <Heading>Welcome to Bank!</Heading>
          <Heading type="sub">Sign Up to begin</Heading>
        </div>
        <Box
          component="form"
          onSubmit={
            secondForm ? secondFormik.handleSubmit : formik.handleSubmit
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "25rem",
            "@media screen and (max-width: 420px)": {
              width: "18rem",
            },
            "@media screen and (min-width: 1440px)": {
              width: "60%",
            },
          }}
        >
          {secondForm && (
            <BackComponent onClick={() => setSecondForm(false)}>
              <ArrowBackIosRoundedIcon /> Back
            </BackComponent>
          )}
          {!secondForm ? (
            <>
              <OutlinedTextField
                label="Email"
                type="email"
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
              <OutlinedTextField
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <OutlinedTextField
                label="Confirm Password"
                type="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
              />
            </>
          ) : (
            <>
              <OutlinedTextField
                label="Name"
                type="name"
                value={secondFormik.values.name}
                error={
                  secondFormik.touched.name && Boolean(secondFormik.errors.name)
                }
                helperText={
                  secondFormik.touched.name && secondFormik.errors.name
                }
                onChange={secondFormik.handleChange}
              />
              <OutlinedTextField
                label="ATM PIN"
                type="atm_pin"
                value={secondFormik.values.atm_pin}
                error={
                  secondFormik.touched.atm_pin &&
                  Boolean(secondFormik.errors.atm_pin)
                }
                helperText={
                  secondFormik.touched.atm_pin && secondFormik.errors.atm_pin
                }
                onChange={secondFormik.handleChange}
              />
              <OutlinedTextField
                label="Confirm ATM PIN"
                type="confirm_atm_pin"
                value={secondFormik.values.confirm_atm_pin}
                error={
                  secondFormik.touched.confirm_atm_pin &&
                  Boolean(secondFormik.errors.confirm_atm_pin)
                }
                helperText={
                  secondFormik.touched.confirm_atm_pin &&
                  secondFormik.errors.confirm_atm_pin
                }
                onChange={secondFormik.handleChange}
              />
            </>
          )}
          <WrapAndCenter>
            {secondForm ? (
              <FormButton type="submit">Finish</FormButton>
            ) : (
              <FormButton type="submit">Next</FormButton>
            )}
            <Link href="/login">
              Already have an account? <span>Sign In</span>
            </Link>
          </WrapAndCenter>
        </Box>
      </ContentWrapper>
    </AuthPage>
  );
};

export default SignUp;
