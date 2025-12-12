const GeoDisplay = ({ geoData, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <p className="text-gray-500 text-center">No data available</p>
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
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-primary mb-6 pb-3 border-b-2 border-primary">
        IP Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {dataFields.map(
          (field) =>
            field.value && (
              <div key={field.label} className="space-y-1">
                <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {field.label}
                </dt>
                <dd className="text-base text-gray-900 font-medium">
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
