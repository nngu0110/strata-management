"use client";
import React, { useEffect, useState } from "react";

interface BuildingData {
 buildingName: string;
 address: string;
 floors: number;
 yearBuilt: number;
}

const initialFormData: BuildingData = {
 buildingName: "",
 address: "",
 floors: 0,
 yearBuilt: 2023,
};

export default function Building() {
 const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
 const [formData, setFormData] = useState<BuildingData>(initialFormData);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [successMessage, setSuccessMessage] = useState("");
 const [errorMessage, setErrorMessage] = useState("");

 useEffect(() => {
  fetchBuildingData();
 }, []);

 // GET Request function
 const fetchBuildingData = async () => {
  try {
   const response = await fetch("/api/building", { method: "GET" }); //api endpoints // abc.com xyz.com
   const data = await response.json();
   setBuildingData(data);
  } catch (error) {
   console.error("Error fetching building data:", error);
   setErrorMessage("Failed to load building data. Please try again later.");
  }
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({
   ...formData,
   [name]: name === "floors" || name === "yearBuilt" ? parseInt(value) || 0 : value,
  });
 };

 //POST Request function
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSuccessMessage("");
  setErrorMessage("");

  try {
   const response = await fetch("/api/building", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), //convert to json
   });

   if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
   }

   //if(response.status !== 200){
   //   throw new Error(`Error: ${response.status}`);
   // }

   setSuccessMessage("Building information submitted successfully!");
   setFormData(initialFormData);

   fetchBuildingData();
  } catch (error) {
   console.error("Error submitting building data:", error);
   setErrorMessage("Failed to submit building information. Please try again.");
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="space-y-8">
   <div className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl text-black font-bold mb-6">Building Management</h1>

    <div className="mb-8">
     <h2 className="text-xl text-black font-semibold mb-4">Add New Building</h2>
     {/* form để nhập dữ liệu, tạo request body cho post request */}
     <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
       <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700 mb-1">
        Building Name
       </label>
       <input
        type="text"
        id="buildingName"
        name="buildingName"
        value={formData.buildingName}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
       />
      </div>

      <div>
       <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
        Address
       </label>
       <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
       />
      </div>

      <div className="grid grid-cols-2 gap-4">
       <div>
        <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-1">
         Number of Floors
        </label>
        <input
         type="number"
         id="floors"
         name="floors"
         value={formData.floors}
         onChange={handleInputChange}
         required
         min="1"
         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
       </div>

       <div>
        <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">
         Year Built
        </label>
        <input
         type="number"
         id="yearBuilt"
         name="yearBuilt"
         value={formData.yearBuilt}
         onChange={handleInputChange}
         required
         min="1800"
         max={new Date().getFullYear()}
         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
       </div>
      </div>

      <div className="pt-2">
       <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
       >
        {isSubmitting ? "Submitting..." : "Add Building"}
       </button>
      </div>
     </form>

     {successMessage && <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">{successMessage}</div>}

     {errorMessage && <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">{errorMessage}</div>}
    </div>

    <div>
     <h2 className="text-xl text-black font-semibold mb-4">Building Details</h2>
     {buildingData ? (
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        <tr>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Building Name</td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buildingData.buildingName}</td>
        </tr>
        <tr>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Address</td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buildingData.address}</td>
        </tr>
        <tr>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Number of Floors</td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buildingData.floors}</td>
        </tr>
        <tr>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Year Built</td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buildingData.yearBuilt}</td>
        </tr>
       </tbody>
      </table>
     ) : (
      <div className="flex items-center justify-center h-32 bg-gray-50 rounded-md">
       <p className="text-gray-500">Loading building data...</p>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}