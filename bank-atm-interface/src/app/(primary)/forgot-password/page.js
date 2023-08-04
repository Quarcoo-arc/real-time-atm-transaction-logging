"use client";
import React, { useState } from "react";
import { AuthPage } from "@/sharedPages";
import forgotPasswordImg from "/public/forgot_password_img.jpg";
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
import { ChevronLeftRounded, ReplayRounded } from "@mui/icons-material";
import { BackLink, ButtonWrapper, RetryLink } from "./page.styled";
import { useUser } from "../../UserContext";

const ForgotPassword = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [error, setError] = useState(false);
  const { postDataHandler } = useUser();
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
    onSubmit: async (values) => {
      const result = await postDataHandler(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/forgot-password`,
        {
          email: values.email,
        }
      );

      if (!result.success) {
        setError(true);
        setOpenDialogue(true);
      } else {
        setOpenDialogue(true);
      }
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
            <Link href="/login">
              Back to <span>Sign In</span>
            </Link>
          </WrapAndCenter>
        </Box>
      </ContentWrapper>
      <DialogueBox
        open={openDialogue}
        setOpen={setOpenDialogue}
        heading={error ? "Something went wrong" : "Email sent"}
        body={
          error
            ? "Failed to send link to your email"
            : "Check your email for a link to reset your password"
        }
        footer={
          <ButtonWrapper>
            <BackLink href="/login">
              <ChevronLeftRounded /> <p>Back to Sign In</p>
            </BackLink>
            {error ? (
              <RetryLink onClick={() => setOpenDialogue(false)}>
                <ReplayRounded /> <p>Retry</p>
              </RetryLink>
            ) : null}
          </ButtonWrapper>
        }
      />
    </AuthPage>
  );
};

export default ForgotPassword;
