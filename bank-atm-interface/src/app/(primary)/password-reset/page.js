"use client";
import { AuthPage } from "@/sharedPages";
import React, { useEffect, useState } from "react";
import passwordResetImg from "../../../../../public/reset_password_img.jpg";
import { useRouter, useSearchParams } from "next/navigation";
import { ContentWrapper, WrapAndCenter } from "@/components/Wrappers";
import {
  DialogueBox,
  FormButton,
  Heading,
  OutlinedTextField,
} from "@/components";
import { Box, CircularProgress } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useUser } from "../../UserContext";
import {
  BackLink,
  ButtonWrapper,
  RetryLink,
} from "../forgot-password/page.styled";
import { ChevronLeftRounded, ReplayRounded } from "@mui/icons-material";

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { postDataHandler } = useUser();

  const token = searchParams.get("token");

  const validationSchema = yup.object({
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
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (errorMessage || loading) {
        return router.push("/login");
      }
      const result = await postDataHandler(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/password-reset`,
        {
          token,
          newPassword: values.password,
        }
      );

      if (result.success) {
        setOpenDialogue(true);
        formik.resetForm();
      } else {
        setResetError(result.message);
        setOpenDialogue(true);
      }
    },
  });

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setErrorMessage("Operation Failed");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthPage
      btnType="register"
      src={passwordResetImg}
      setOpenSnackBar={setDisplayAlert}
      alertMessage={errorMessage}
      openSnackBar={displayAlert}
    >
      <ContentWrapper>
        <div>
          <Heading>Password Reset</Heading>
          <Heading type="sub">
            {errorMessage
              ? errorMessage
              : loading
              ? "Your request is being processed"
              : "Regain account access"}
          </Heading>
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
          {!loading && !errorMessage ? (
            <>
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
          ) : null}
          <WrapAndCenter>
            {loading ? <CircularProgress sx={{ color: "white" }} /> : null}
            {loading || errorMessage ? (
              <FormButton type="submit">Back To Sign In</FormButton>
            ) : (
              <>
                <FormButton type="submit">Reset</FormButton>
                <Link href="/login">
                  Back to <span>Sign In</span>
                </Link>
              </>
            )}
          </WrapAndCenter>
        </Box>
      </ContentWrapper>
      <DialogueBox
        open={openDialogue}
        setOpen={setOpenDialogue}
        heading={resetError ? resetError : "Operation Successful"}
        body={
          resetError
            ? "Failed to reset your password"
            : "Your password reset was successful"
        }
        footer={
          <ButtonWrapper>
            <BackLink href="/login">
              <ChevronLeftRounded /> <p>Back to Sign In</p>
            </BackLink>
            {resetError ? (
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

export default PasswordReset;
