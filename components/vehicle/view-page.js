import VehicleView from "./vehicle-view";

import DocumentBaseTable from "./document-table-view";
import VehicleTypeView from "./vehicletype-view";

const VehicleAndTypeView = ({ data, datatype }) => {
    let documents=[]
  if (datatype == "vehicle") {
    documents = [
      {
        id: 1,
        name: "Vehicle Registration",
        imageUrl: "6fea233543b840e2885accb8c8207f5a",
        status: true,
      },
      {
        id: 2,
        name: "Driver License",
        imageUrl: data[0]?.driving_license,
        status: true,
      },
      { id: 3, name: "Passport", imageUrl: data[0]?.passport, status: true },
      {
        id: 4,
        name: "Vehicle Insurance",
        imageUrl: data[0]?.insurance,
        status: true,
      },
    ];
  }
  return (
    <>
      <div className="flex gap-6">
        {datatype == "vehicle" && (
          <>
            <div className="w-1/4 rounded-lg">
              <VehicleView data={data} />
            </div>

            <div
              className={`w-${
                datatype == "vehicletype" ? "full" : "3/4"
              } rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
            >
              <DocumentBaseTable data={documents} />
            </div>
          </>
        )}
        {datatype == "vehicletype" && <VehicleTypeView data={data} />}
      </div>
    </>
  );
};

export default VehicleAndTypeView;
