import { formatDate } from "@/utils/constants"
import Link from "next/link"
import { FaEye } from "react-icons/fa"

const VehicleView = ({data}) => {
    return (
        <div className="dark:border-strokedark dark:bg-boxdark bg-white text-black dark:text-white p-6 rounded-lg mt-6 shadow-md">
              <h2 className="text-md font-bold mb-4">Vehicle Information</h2>
          <div className="space-y-2 text-md">
            {data?.length > 0 ? (
              data?.map((item, key) => (
                <div key={key}>
                  <p>
                    <strong>Vehicle Name:</strong>{" "}
                   
                      {item?.modal || 'N/A'}
                 
                  </p>
                  <p>
                    <strong>Vehicle Number:</strong>{" "}
                    <span className="border-2 px-3 py-1 rounded-lg border-dashed inline-block">
                      {item?.plat_no || 'N/A'}
                    </span>
                  </p>
                  <p>
                    <strong>Vehicle Type:</strong>{" "}
                    <Link
                      className="text-primary"
                      href={`/vehicletype/${item?.vehicle_type_id}`}
                    >{item?.vehicle_type || 'N/A'}</Link>
                  </p>
                  <p>
                    <strong>Make:</strong>{" "}
                 
                      {item?.make || 'N/A'}
                  </p>
                  <p>
                    <strong>Variant :</strong>{" "}
                 
                      {item?.variant || 'N/A'}
                  </p>
                  <p>
                    <strong>Created On :</strong>{" "}
                 
                      {formatDate(item?.created_on) || 'N/A'}
                  </p>
                  <p className="flex items-center gap-2">
                    <strong>Delivery Boy Name:</strong>{" "}
                    <Link
                      className="text-primary"
                      href={`/deliveryboy/${item?.ext_id}`}
                    >
                      {item?.delivery_boy_name || 'N/A'}
                    </Link>
                  </p>
                </div>
              ))
            ) : (
              <>
                <p className="text-center">Data not found.</p>
              </>
            )}
            {/*  <p><strong>Seats:</strong> 8</p> */}
            {/* <p><strong>Vehicle Color:</strong> Orange</p> */}

            {/* <p><strong>Zone:</strong> Worldwide</p> */}
          </div>
        </div>
    )
}

export default VehicleView