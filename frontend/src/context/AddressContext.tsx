
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export type AddressType = {
  id: number;
  name: string;
  type: string;
  mobile: string;
  flat: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
};

type AddressContextType = {
  addresses: AddressType[];
  selectedAddress: AddressType | null;
  loading: boolean;
  selectAddress: (address: AddressType) => void;
  fetchAddresses: (userId: number) => Promise<void>;
  addAddress: (userId: number, address: Omit<AddressType, "id">) => Promise<void>;
  updateAddress: (userId: number, address: AddressType) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
};

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:4000/api/address";

  /* ================= LOAD SAVED SELECTED ADDRESS ================= */
  useEffect(() => {
    const stored = localStorage.getItem("selectedAddress");
    if (stored) {
      setSelectedAddress(JSON.parse(stored));
    }
  }, []);

  /* ================= FETCH ADDRESSES ================= */
  const fetchAddresses = async (userId: number) => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/${userId}`);

      const formatted = res.data.data.map((item: any) => ({
        id: item.AddressID,
        name: item.FullName,
        mobile: item.MobileNumber,
        flat: item.AddressLine1,
        street: item.AddressLine2,
        landmark: item.Landmark,
        city: item.City,
        state: item.State,
        pincode: item.Pincode,
        type: item.AddressType,
        isDefault: item.IsDefault,
      }));

      setAddresses(formatted);

      /* ================= PRESERVE SELECTED ================= */

      const stored = localStorage.getItem("selectedAddress");

      if (stored) {
        const parsed = JSON.parse(stored);

        const exists = formatted.find(a => a.id === parsed.id);

        if (exists) {
          setSelectedAddress(exists);
          return;
        }
      }

      /* ================= FALLBACK ================= */

      if (formatted.length === 0) {
        setSelectedAddress(null);
      } else {
        const defaultAddress = formatted.find(a => a.isDefault);
        const finalAddress = defaultAddress || formatted[0];

        setSelectedAddress(finalAddress);
        localStorage.setItem("selectedAddress", JSON.stringify(finalAddress));
      }

    } catch (err) {
      console.error("Failed to load addresses", err);
      setSelectedAddress(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SELECT ================= */
  const selectAddress = (address: AddressType) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  /* ================= ADD ================= */
  const addAddress = async (userId: number, address: Omit<AddressType, "id">) => {
    try {
      await axios.post(API_BASE, {
        userId,
        name: address.name,
        mobile: address.mobile,
        flat: address.flat,
        street: address.street,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        type: address.type,
        isDefault: address.isDefault || false,
      });

      await fetchAddresses(userId);

      // ✅ Auto select latest address
      setTimeout(() => {
        setAddresses(prev => {
          if (prev.length > 0) {
            const latest = prev[prev.length - 1];
            setSelectedAddress(latest);
            localStorage.setItem("selectedAddress", JSON.stringify(latest));
          }
          return prev;
        });
      }, 200);

    } catch (err) {
      console.error("Failed to add address", err);
    }
  };

  /* ================= UPDATE ================= */
  const updateAddress = async (userId: number, address: AddressType) => {
    try {
      await axios.put(`${API_BASE}/${address.id}`, {
        userId,
        name: address.name,
        mobile: address.mobile,
        flat: address.flat,
        street: address.street,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        type: address.type,
        isDefault: address.isDefault || false,
      });

      await fetchAddresses(userId);

      // ✅ update selected if edited
      if (selectedAddress?.id === address.id) {
        setSelectedAddress(address);
        localStorage.setItem("selectedAddress", JSON.stringify(address));
      }

    } catch (err) {
      console.error("Failed to update address", err);
    }
  };

  /* ================= DELETE ================= */
  const deleteAddress = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);

      const updated = addresses.filter(a => a.id !== id);
      setAddresses(updated);

      if (selectedAddress?.id === id) {
        setSelectedAddress(null);
        localStorage.removeItem("selectedAddress");
      }

    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        loading,
        selectAddress,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within AddressProvider");
  }
  return context;
};


