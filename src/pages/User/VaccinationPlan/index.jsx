import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import banner from "../../../assets/images/banner.jpg";
import { Button, Select, Space, Popconfirm } from "antd";
import moment from "moment";

import * as Icon from "@ant-design/icons";

import {
  getVaccinationPlanListAction,
  getVaccineListAction,
} from "../../../redux/actions";

import * as Style from "./styles";

function VaccinationPlanPage(props) {
  const { Option } = Select;
  const [searchKey, setSearchKey] = useState("");
  const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyData, setModifyData] = useState({});

  const { vaccinationPlanList } = useSelector(
    (state) => state.vaccinationPlanReducer
  );
  const { vaccineList } = useSelector((state) => state.vaccineReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccinationPlanListAction());
    dispatch(getVaccineListAction());
  }, []);

  const optionVaccineList = vaccineList.data.map(
    (vaccineItem, vaccineIndex) => {
      return (
        <>
          <Option key={vaccineIndex} value={vaccineItem._id}>
            {vaccineItem.name}
          </Option>
        </>
      );
    }
  );
  

  const tableColumn = [
    {
      title: "Tên vắc xin",
      dataIndex: "vaccine_id",
      key: "vaccine_id",
      render: (value) => {
        return value?.name;
      },
    },
    {
      title: "Ngày tiêm",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Giờ Tiêm",
      dataIndex: "time",
      key: "time",
    },
  ];

  const tableData = vaccinationPlanList.data.map(
    (vaccinationPlanItem, vaccinationPlanIndex) => {
      return {
        key: vaccinationPlanIndex,
        ...vaccinationPlanItem,
      };
    }
  );

  return (
    <div>
      <Style.Banner img={banner}>
        <div>
          <h1>LỊCH TIÊM VẮC XIN</h1>
        </div>
      </Style.Banner>
      <Style.ContainerTable>
      <Select
        style={{ width: 400, marginBottom: 10 }}
        size="large"
        onChange={(value) =>
          dispatch(
            getVaccinationPlanListAction({
              filter: value
            })
          )
        }
      >
        {optionVaccineList}
      </Select>
      <Button type="primary" size="large"
      onClick={(value) =>
        dispatch(
          getVaccinationPlanListAction()
        )
      }
      >
        Tất cả
      </Button>
        <Style.CustomTable
          size="large"
          columns={tableColumn}
          dataSource={tableData}
          loading={vaccinationPlanList.load}
        />
      </Style.ContainerTable>
    </div>
  );
}

export default VaccinationPlanPage;
