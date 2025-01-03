"use client";

import * as React from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "@/styles/permission.module.css";
import { delAPIPermission, postAPICreatePermission } from "@/services/utils";
import { usePermissions } from "@/hooks/usePermissions";
import { Pagination2 } from "@/components/pagination";
import Search from "@/components/ui/search";
import { useState, useEffect } from "react";
import { MdDeleteOutline, MdHighlightOff } from "react-icons/md";
import { Flip } from "react-toastify";

export const PermissionPopUp = ({ onPermissionAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [permissionName, setPermissionName] = useState("");
  const [permissionDescription, setPermissionDescription] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setPermissionName("");
    setPermissionDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!permissionName) {
      toast.error("Permission name is required!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    try {
      const newPermission = await postAPICreatePermission(
        permissionName,
        permissionDescription || "System-created permission"
      );

      if (onPermissionAdded) {
        onPermissionAdded();
      }

      toast.success("Permission added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Failed to add permission", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  return (
    <>
      <button
        className={styles.update}
        onClick={handleOpenModal}
        title="Add New Permission"
      >
        <MdAdd />
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Add New Permission</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Permission Name</label>
                <input
                  type="text"
                  value={permissionName}
                  onChange={(e) => setPermissionName(e.target.value)}
                  placeholder="Enter permission name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description (Optional)</label>
                <input
                  type="text"
                  value={permissionDescription}
                  onChange={(e) => setPermissionDescription(e.target.value)}
                  placeholder="Enter permission description"
                />
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

const ITEMS_PER_PAGE = 10;

const PermissionManager = () => {
  const { listAllPermissions } = usePermissions();
  const [permissions, setPermissions] = useState([]);
  const [permissionsCount, setPermissionsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadPermissions = async () => {
    try {
      setLoading(true);
      const fetchedPermissions = await listAllPermissions();
      setPermissions(fetchedPermissions);
      setPermissionsCount(fetchedPermissions.length);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load permissions", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPermissions = filteredPermissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleDeletePermission = async (permissionId) => {
    if (window.confirm(`Are you sure you want to delete this permission?`)) {
      try {
        await delAPIPermission(permissionId);

        toast.error("Permission deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
          icon: ({ theme, type }) => (
            <MdHighlightOff style={{ color: "red" }} />
          ),
        });

        loadPermissions();
      } catch (err) {
        toast.error("Failed to delete permission", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    }
  };

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
          placeholder="Search permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PermissionPopUp onPermissionAdded={loadPermissions} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Permission</td>
            <td>Description</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentPermissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>{permission.description}</td>
              <td>
                <div className={styles.buttons}>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeletePermission(permission.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination2
        count={filteredPermissions.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PermissionManager;
