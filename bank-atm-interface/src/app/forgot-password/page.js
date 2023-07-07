"use client";
import React, { useState } from "react";
import { AuthPage } from "@/sharedPages";
import forgotPasswordImg from "../../../public/forgot_password_img.jpg";
import {
  DialogueBox,
  FormButton,
  Heading,
  OutlinedTextField,
} from "@/components";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { ContentWrapper, WrapAndCenter } from "@/components/Wrappers";
import { ChevronLeftRounded } from "@mui/icons-material";
import { BackLink } from "./page.styled";

const ForgotPassword = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setOpenDialogue(true);
    },
  });

  return (
    <AuthPage btnType="register" src={forgotPasswordImg}>
      <ContentWrapper>
        <div>
          <Heading>Forgot Password</Heading>
          <Heading type="sub">Regain account access</Heading>
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
          <WrapAndCenter>
            <FormButton type="submit">Send</FormButton>
            <Link href="/register">
              Back to <span>Sign In</span>
            </Link>
          </WrapAndCenter>
        </Box>
      </ContentWrapper>
      <DialogueBox
        open={openDialogue}
        setOpen={setOpenDialogue}
        heading="Email sent"
        body="Check your email for a link to reset your password" //TODO: Change dialogue box content on error
        footer={
          <>
            <BackLink href="/login">
              <ChevronLeftRounded /> Back to Sign In
            </BackLink>
            {/* Todo: Add retry button for the case of an error */}
          </>
        }
      />
    </AuthPage>
  );
};

export default ForgotPassword;
