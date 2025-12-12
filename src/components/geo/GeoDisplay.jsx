const GeoDisplay = ({ geoData, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#313244]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-md text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500 text-center text-sm">No data available</p>
      </div>
    );
  }

  const dataFields = [
    { label: "IP Address", value: geoData.ip },
    { label: "City", value: geoData.city },
    { label: "Region", value: geoData.region },
    { label: "Country", value: geoData.country },
    { label: "Location", value: geoData.loc },
    { label: "Hostname", value: geoData.hostname },
    { label: "Organization", value: geoData.org },
    { label: "Postal Code", value: geoData.postal },
    { label: "Timezone", value: geoData.timezone },
  ];

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-300 uppercase tracking-wide">
        IP Information
      </h3>

      <div className="space-y-3">
        {dataFields.map(
          (field) =>
            field.value && (
              <div
                key={field.label}
                className="flex justify-between items-baseline gap-3"
              >
                <dt className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex-shrink-0">
                  {field.label}
                </dt>
                <dd className="text-sm text-gray-900 font-medium text-right break-all">
                  {field.value}
                </dd>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default GeoDisplay;
