"use client";
import React from "react";
import { SubPage } from "@/sharedPages";
import { Text } from "./page.styled";

const SuccessfulPINChange = () => {
  return (
    <SubPage
      heading="Operation Complete"
      subHeading="Your PIN change was processed successfully"
      buttons={true}
    >
      <Text>Thank you for banking with us.</Text>
    </SubPage>
  );
};

export default SuccessfulPINChange;
