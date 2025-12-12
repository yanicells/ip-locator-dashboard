import { useState, useEffect } from "react";
import geoService from "../../services/geoService";

const GeoSearch = ({ onSearch, onClear, externalInputs }) => {
  const [inputs, setInputs] = useState([""]);
  const [errors, setErrors] = useState([]);

  // Update inputs when externalInputs prop changes
  useEffect(() => {
    if (externalInputs && externalInputs.length > 0) {
      setInputs(externalInputs);
      setErrors([]);
    }
  }, [externalInputs]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Clear error for this input
    const newErrors = [...errors];
    newErrors[index] = "";
    setErrors(newErrors);
  };

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
    setErrors([...errors, ""]);
  };

  const handleRemoveInput = (index) => {
    if (inputs.length > 1) {
      const newInputs = inputs.filter((_, i) => i !== index);
      const newErrors = errors.filter((_, i) => i !== index);
      setInputs(newInputs);
      setErrors(newErrors);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter out empty strings
    const validInputs = inputs.map((ip) => ip.trim()).filter((ip) => ip !== "");

    if (validInputs.length === 0) {
      setErrors(["Please enter at least one IP address"]);
      return;
    }

    // Validate all IPs
    const newErrors = [];
    let hasError = false;

    inputs.forEach((ip, index) => {
      const trimmedIp = ip.trim();
      if (trimmedIp === "") {
        newErrors[index] = "";
      } else if (!geoService.validateIp(trimmedIp)) {
        newErrors[index] = "Invalid IP format";
        hasError = true;
      } else {
        newErrors[index] = "";
      }
    });

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    // Send valid IPs to parent
    onSearch(validInputs);

    // Don't reset inputs after search - keep them visible
  };

  const handleClear = () => {
    setInputs([""]);
    setErrors([]);
    onClear();
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        Search IP Addresses
      </h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          {/* Dynamic Input List */}
          <div className="space-y-2.5">
            {inputs.map((input, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`e.g., 8.8.8.8`}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#313244] focus:border-transparent transition-all"
                  />
                  {errors[index] && (
                    <p className="text-red-600 text-xs mt-1">{errors[index]}</p>
                  )}
                </div>

                {inputs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveInput(index)}
                    className="px-2.5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors"
                    title="Remove IP"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add IP Button */}
          <button
            type="button"
            onClick={handleAddInput}
            className="mt-2.5 px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-md transition-colors text-xs w-full"
          >
            + Add Another IP
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#313244] hover:bg-[#1e1e2e] text-white text-sm font-medium rounded-md transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {errors.length > 0 &&
          errors[0] &&
          typeof errors[0] === "string" &&
          errors[0].includes("at least one") && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs">
              {errors[0]}
            </div>
          )}
      </form>
    </div>
  );
};

export default GeoSearch;
