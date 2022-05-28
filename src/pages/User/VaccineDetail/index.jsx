import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Space, Popconfirm, Input, Col } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import moment from "moment";
import { getVaccineDetailAction } from "../../../redux/actions";

import * as Style from "./styles";
import bannerVaccine from "../../../assets/images/banner.jpg";
function VaccineDetailPage({ match }) {
  console.log(match);
  const vaccineId = match.params.id;
  console.log(vaccineId);
  const { vaccineDetail } = useSelector((state) => state.vaccineReducer);
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
  }, [vaccineId]);
  return (
    <>
      <div>
        <Style.Banner img={bannerVaccine} />
      </div>
      <Style.ContainerVaccineDetail>
        <h1>Tên Vắc Xin: {vaccineDetail.data.name}</h1>
        <Row>
          <Col span={12}>
            <img src={vaccineDetail.data.image} alt="" width="100%"/>
          </Col>
          <Col span={12}>
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
