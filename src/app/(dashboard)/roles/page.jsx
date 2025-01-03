"use client";

import { useRoles } from "../../../hooks/useRoles";
import { usePermissions } from "../../../hooks/usePermissions";
import { toast } from "react-toastify";
import * as React from "react";
import styles from "@/styles/permission.module.css";
import { Pagination2 } from "@/components/pagination";
import Search from "@/components/ui/search";
import { useState, useEffect } from "react";
import {
  MdAdd,
  MdDeleteOutline,
  MdHighlightOff,
  MdRemove,
} from "react-icons/md";
import { Flip } from "react-toastify";
import {
  delAPIRole,
  postAPICreateRole,
  postAPIAddPermissionToRole,
  putAPIAddPermissionForRole,
  delAPIAddPermissionForRole,
} from "@/services/utils";

const ITEMS_PER_PAGE = 10;

const RolePermissionPopUpAdd = ({
  roleId,
  availablePermissions,
  currentRolePermissions,
  onPermissionAdded,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedPermission("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPermission) {
      toast.error("Please select a permission!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    try {
      await putAPIAddPermissionForRole(roleId, selectedPermission);

      if (onPermissionAdded) {
        onPermissionAdded();
      }

      toast.success("Permission added to role successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Failed to add permission to role", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const filteredPermissions = availablePermissions.filter(
    (perm) =>
      !currentRolePermissions.some((existing) => existing.id === perm.id)
  );

  return (
    <>
      <button
        className={styles.update}
        onClick={handleOpenModal}
        title="Add Permission to Role"
      >
        <MdAdd />
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Add Permission to Role</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Select Permission</label>
                <select
                  value={selectedPermission}
                  onChange={(e) => setSelectedPermission(e.target.value)}
                  required
                >
                  <option value="">Select a Permission</option>
                  {filteredPermissions.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.update}>
                  Add Permission
                </button>
                <button
                  type="button"
                  className={styles.delete}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const RolePermissionPopUpDel = ({
  roleId,
  availablePermissions,
  currentRolePermissions,
  onPermissionDel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedPermission("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPermission) {
      toast.error("Please select a permission!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    try {
      await delAPIAddPermissionForRole(roleId, selectedPermission);

      if (onPermissionDel) {
        onPermissionDel();
      }

      toast.success("Permission delete from role successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Failed to delete permission from role", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const filteredPermissions = availablePermissions.filter((perm) =>
    currentRolePermissions.some((existing) => existing.id === perm.id)
  );

  return (
    <>
      <button
        className={styles.update}
        onClick={handleOpenModal}
        title="Delete Permission from Role"
      >
        <MdRemove />
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Delete Permission to Role</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Select Permission</label>
                <select
                  value={selectedPermission}
                  onChange={(e) => setSelectedPermission(e.target.value)}
                  required
                >
                  <option value="">Select a Permission</option>
                  {filteredPermissions.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.update}>
                  Delete Permission
                </button>
                <button
                  type="button"
                  className={styles.delete}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const RolesManager = () => {
  const { listAllRoles } = useRoles();
  const { listAllPermissions } = usePermissions();
  const [roles, setRoles] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [fetchedRoles, fetchedPermissions] = await Promise.all([
        listAllRoles(),
        listAllPermissions(),
      ]);
      setRoles(fetchedRoles);
      setAvailablePermissions(fetchedPermissions);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load roles or permissions", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRole = async () => {
    if (!newRole) return;

    try {
      await postAPICreateRole(newRole);

      toast.success("Role added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      await fetchData();
      setNewRole("");
    } catch (err) {
      toast.error("Failed to add Role", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm(`Remove this role?`)) {
      try {
        await delAPIRole(roleId);

        toast.error("Role removed successfully!", {
          position: "top-right",
          transition: Flip,
          icon: <MdHighlightOff style={{ color: "red" }} />,
        });

        await fetchData();
      } catch (err) {
        toast.error("Failed to remove role", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentRoles = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="New Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className={styles.input}
          />
          <button className={styles.update} onClick={handleAddRole}>
            <MdAdd />
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Role</td>
            <td>Permissions</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                {role.permissions.length > 0
                  ? role.permissions.map((p) => p.name).join(", ")
                  : "No permissions"}
              </td>
              <td>
                <div className={styles.buttons}>
                  <RolePermissionPopUpAdd
                    roleId={role.id}
                    availablePermissions={availablePermissions}
                    currentRolePermissions={role.permissions}
                    onPermissionAdded={fetchData}
                  />
                  <RolePermissionPopUpDel
                    roleId={role.id}
                    availablePermissions={availablePermissions}
                    currentRolePermissions={role.permissions}
                    onPermissionDel={fetchData}
                  />
                  {role.id > 4 && (
                    <button
                      className={styles.delete}
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination2
        count={filteredRoles.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RolesManager;
