"use client";
import React from "react";
import { AuthPage } from "@/sharedPages";
import registerImg from "../../../public/register_img.jpg";
import { ContentWrapper, WrapAndCenter } from "@/components/Wrappers";
import { FormButton, Heading, OutlinedTextField } from "@/components";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";

const SignUp = () => {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <AuthPage btnType="Sign In" src={registerImg}>
      <ContentWrapper>
        <div>
          <Heading>Welcome to Bank!</Heading>
          <Heading type="sub">Sign Up to begin</Heading>
        </div>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <WrapAndCenter>
            <FormButton type="submit">Next</FormButton>
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
