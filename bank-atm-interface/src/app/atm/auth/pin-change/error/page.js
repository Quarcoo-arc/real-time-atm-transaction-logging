"use client";
import React from "react";
import { SubPage } from "@/sharedPages";
import { Text } from "@/components/Wrappers";

const SuccessfulPINChange = () => {
  return (
    <SubPage
      heading="Operation Failed"
      subHeading="Your PIN change request could not  be processed"
      buttons={true}
    >
      <Text>
        Please try again or walk into any of our offices for a PIN reset
      </Text>
    </SubPage>
  );
};

export default SuccessfulPINChange;
