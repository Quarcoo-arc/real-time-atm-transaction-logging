"use client";
import React, { useEffect } from "react";
import { SubPage } from "@/sharedPages";
import { Text } from "@/components/Wrappers";
import { useUser } from "@/app/UserContext";

const SuccessfulPINChange = () => {
  const { setIsLoading } = useUser();

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
