"use client";
import React from "react";
import { AuthPage } from "@/sharedPages";
import registerImg from "../../../public/register_img.jpg";
import { OutlinedTextField } from "@/components";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { Wrapper } from "./Page.styled";

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
    <AuthPage btnType="Sign Up" src={registerImg}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <OutlinedTextField
          label="Email"
          type="email"
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
        />
        <Wrapper>
          <OutlinedTextField
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link href="#">Forgot Password?</Link>
        </Wrapper>
      </Box>
    </AuthPage>
  );
};

export default SignUp;
