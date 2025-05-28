"use client";
import React, { useState, useEffect } from "react";

export default function Pricing() {
  const [fee, setFee] = useState<number | null>(null);
  const [inputFee, setInputFee] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFee();
  }, []);

  const fetchFee = async () => {
    try {
      const response = await fetch("/api/pricing", { method: "GET" });
      const data = await response.json();
      setFee(data.fee);
    } catch (error) {
      console.error("Error fetching fee:", error);
      setMessage("Failed to load current fee.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fee: parseFloat(inputFee) }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setMessage("Service fee updated successfully!");
      setInputFee("");
      fetchFee(); // reload updated value
    } catch (error) {
      console.error("Error updating fee:", error);
      setMessage("Failed to update fee. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded text-black">
      <h1 className="text-2xl font-bold mb-4">Pricing Management</h1>

      <p className="mb-4">
        Current Service Fee:{" "}
        <span className="font-semibold">
          {fee !== null ? `$${fee} per unit` : "Loading..."}
        </span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fee" className="block mb-1 font-medium">
            New Service Fee (AUD)
          </label>
          <input
            type="number"
            step="0.01"
            id="fee"
            name="fee"
            required
            value={inputFee}
            onChange={(e) => setInputFee(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Update Fee
        </button>
      </form>

      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}