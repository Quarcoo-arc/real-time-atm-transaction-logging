"use client";
import React, { useEffect, useState } from "react";
import { AuthPage } from "@/sharedPages";
import loginImg from "../../../../public/login_img.jpg";
import { FormButton, Heading, OutlinedTextField } from "@/components";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { ContentWrapper, WrapAndCenter } from "@/components/Wrappers";
import { Wrapper } from "./page.styled";
import { useRouter } from "next/navigation";
import { useUser } from "../../UserContext";

const Login = () => {
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { sessionTimeout, setSessionTimeout, loginUserHandler } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (sessionTimeout) {
      setErrorMessage("Logged out due to inactivity");
      setDisplayAlert(true);
    }

    return () => {
      setSessionTimeout(false);
      setErrorMessage("");
    };
  }, [sessionTimeout]);

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
    onSubmit: async (values) => {
      const result = await loginUserHandler({
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        router.push("/atm");
      } else {
        setDisplayAlert(true);
        setErrorMessage(
          result.message
            ? result.message
            : result.error
            ? result.error
            : "Something went wrong!"
        );
      }
    },
  });

  return (
    <AuthPage
      btnType="register"
      src={loginImg}
      setOpenSnackBar={setDisplayAlert}
      alertMessage={errorMessage}
      openSnackBar={displayAlert}
    >
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
            <Link href="/forgot-password">Forgot Password?</Link>
          </Wrapper>
          <WrapAndCenter>
            <FormButton type="submit">Sign In</FormButton>
            <Link href="/register">
              Don’t have an account? <span>Sign Up</span>
            </Link>
          </WrapAndCenter>
        </Box>
      </ContentWrapper>
    </AuthPage>
  );
};

export default Login;
