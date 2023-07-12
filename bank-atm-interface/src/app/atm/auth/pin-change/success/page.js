"use client";
import React from "react";
import { SubPage } from "@/sharedPages";

const SuccessfulPINChange = () => {
  return (
    <SubPage
      heading="Operation Complete"
      subHeading="Your PIN change was processed successfully"
      buttons={true}
    >
      <p>Thank you for banking with us.</p>
    </SubPage>
  );
};

export default SuccessfulPINChange;
