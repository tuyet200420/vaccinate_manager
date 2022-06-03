import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row,Input } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import { getVaccineListAction } from "../../../redux/actions";

import * as Style from "./styles";
import banner from "../../../assets/images/banner.jpg";
function VaccinePage(props) {
  const { vaccineList } = useSelector((state) => state.vaccineReducer);
  const [searchKey, setSearchKey] = useState("");

  function ListVaccineData() {
    return vaccineList.data.map((vaccineItem, vaccineIndex) => {
      return (
        <>
          <Style.ColItem span={6}>
            <div
              className="card"
              onClick={() => history.push(`/vaccine/${vaccineItem._id}`)}
              key={`vaccine-${vaccineIndex}`}
            >
              <img src={vaccineItem.image} alt="" width="100%" height="230px" />
              <h4>{vaccineItem.name}</h4>

              <Style.Description
                dangerouslySetInnerHTML={{
                  __html: vaccineItem.description,
                }}
              />
            </div>
          </Style.ColItem>
        </>
      );
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVaccineListAction());
  }, []);

  function handleSearchVaccine(value) {
    setSearchKey(value);
    dispatch(
      getVaccineListAction({
        searchKey: value,
      })
    );
  }
  return (
    <div>
      <Style.Banner img={banner}>
        <div>
          <h1>THÔNG TIN VẮC XIN</h1>
          <Style.Search>
            <Input
              size="large"
              placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchVaccine(e.target.value)}
            />
          </Style.Search>
        </div>
      </Style.Banner>
      <Style.Container>
        <Row gutter={[32, 16]}>{ListVaccineData()}</Row>
      </Style.Container>
    </div>
  );
}
export default VaccinePage;
