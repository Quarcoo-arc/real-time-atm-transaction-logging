"use client";
import React from "react";
import { AuthPage } from "@/sharedPages";
import registerImg from "../../../public/register_img.jpg";
import { Heading, OutlinedTextField } from "@/components";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import Button from "@mui/material/Button";
import { ContentWrapper, WrapAndCenter, Wrapper } from "./page.styled";

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
      <ContentWrapper>
        <div>
          <Heading>Welcome to Bank!</Heading>
          <Heading type="sub">Sign In to continue</Heading>
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
          <WrapAndCenter>
            <Button
              type="submit"
              sx={{
                borderRadius: "1.25rem",
                background: "#FFF",
                color: "#000",
                fontWeight: 600,
                fontSize: "1.8rem",
                padding: "0.4rem 1rem",
                fontFamily: "Poppins",
                textTransform: "capitalize",
                "&:hover": {
                  border: "none",
                  background: "none",
                  color: "white",
                  outline: "2px solid white",
                  outlineOffset: "1px",
                  boxSizing: "border-box",
                },
              }}
              variant="contained"
            >
              Sign In
            </Button>
            <Link href="#">
              Don’t have an account? <span>Sign Up</span>
            </Link>
          </WrapAndCenter>
        </Box>
      </ContentWrapper>
    </AuthPage>
  );
};

export default SignUp;
