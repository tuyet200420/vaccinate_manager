import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Space, Popconfirm, Input, Col } from "antd";
import * as Icon from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import history from "../../../utils/history";
import moment from "moment";
import { Pie } from "react-chartjs-2";
import { getVaccineDetailAction,
          getStorageDetailAction 
} from "../../../redux/actions";

import * as Style from "./styles";
import bannerVaccine from "../../../assets/images/banner.jpg";
function VaccineDetailPage({ match }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [dataChart, setDataChart] = useState([100, 100, 100]);
  const vaccineId = match.params.id;
  console.log(vaccineId);
  const { vaccineDetail } = useSelector((state) => state.vaccineReducer);
  const { storageDetail } = useSelector((state) => state.storageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getVaccineDetailAction({
        id: vaccineId,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getVaccineDetailAction({
        id: vaccineId,
      })
    );
    dispatch(
      getStorageDetailAction({
        id: vaccineId,
      })
    );
  }, [vaccineId]);
  useEffect(() => {
    setDataChart([
      storageDetail.data.quantity_import,
      storageDetail.data.quantity_sold,
      storageDetail.data.quantity,
    ]);
  }, [storageDetail]);
  const data = {
    labels: ["Đã Nhập", "Đã Tiêm", "Tồn kho"],
    datasets: [
      {
        label: "Vắc Xin",
        data: [...dataChart],
        backgroundColor: [
          "rgba(252, 7, 60, 0.2)",
          "rgba(8, 156, 255, 0.2)",
          "rgba(8, 255, 41, 0.2)",
        ],
        borderColor: ["#f7063a", "#0397fa", "#03fa2c"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div>
        <Style.Banner img={bannerVaccine} />
      </div>
      <Style.ContainerVaccineDetail>
        <h1>Tên Vắc Xin: {vaccineDetail.data.name}</h1>
        <Row>
          <Col span={12}>
            <img src={vaccineDetail.data.image} alt="" width="100%" style={{boxShadow: "0 0 3px gray"}} />
          </Col>
          <Col span={5}>
            <div className="right">
              <p>
                <span className="title">Liều lượng:</span>{" "}
                <span>{vaccineDetail.data.dosage}</span>
              </p>
              <p>
                <span className="title">Nước sản xuất:</span>{" "}
                <span>{vaccineDetail.data.origin}</span>
              </p>
              <p>
                <span className="title">Độ tuổi sử dụng:</span>
                <span>{`${
                  vaccineDetail.data.min_age
                    ? `Trên ${vaccineDetail.data.min_age}`
                    : ""
                }  ${
                  vaccineDetail.data.max_age
                    ? `dưới ${vaccineDetail.data.max_age}`
                    : ""
                } `}</span>
              </p>
            </div>
          </Col >
          <Col span={7}>
          <Style.ChartBox>
          <Pie data={data} />;
        </Style.ChartBox>
          </Col>
        </Row>

        <div>
          <p className="title">Mô tả chi tiết:</p>

          <Style.Description
            dangerouslySetInnerHTML={{
              __html: vaccineDetail.data.description,
            }}
          />
        </div>
      </Style.ContainerVaccineDetail>
    </>
  );
}
export default VaccineDetailPage;
