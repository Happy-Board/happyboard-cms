"use client";

import { useState } from "react";
import { getAPIAllRoles } from "@/services/utils";

export const useRoles = () => {
  const [loading, setLoading] = useState(true);

  const listAllRoles = async () => {
    try {
      const res = await getAPIAllRoles();
      return res.roles;
    } catch (err) {
      console.log("Update Failed");
    } finally {
      setLoading(false);
    }
  };
  return { listAllRoles, loading };
};
