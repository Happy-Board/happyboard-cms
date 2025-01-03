"use client";

import { useState } from "react";
import { getAPIPermissions } from "@/services/utils";

export const usePermissions = () => {
  const [loading, setLoading] = useState(true);

  const listAllPermissions = async () => {
    try {
      const res = await getAPIPermissions();
      return res.permissions;
    } catch (err) {
      console.log("Update Failed");
    } finally {
      setLoading(false);
    }
  };
  return { listAllPermissions, loading };
};
