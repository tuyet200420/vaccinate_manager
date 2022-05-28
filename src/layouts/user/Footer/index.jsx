import { Col, Row, Space, Button, Tooltip } from "antd";
import { UpOutlined } from "@ant-design/icons";
import history from "../../../utils/history";
import dmca from "../../../assets/images/dmca.png";
import dathongbao from "../../../assets/images/dathongbao.png";

import * as Style from "./styles";

function Footer() {
  return (
    <>
      <Style.Footer>
        <div className="container">
          <Row>
            <Col span={18}>
              <div>
                CÔNG TY CỔ PHẦN VACXIN VIỆT NAM results.
                <br />
                Giấy chứng nhận ĐKKD số 0107631488 do sở Kế hoạch và Đầu tư TP.
                Hà Nội cấp ngày 11/11/2016 results.
                <br />
                Địa chỉ: 180 Trường Chinh, P. Khương Thượng, Q. Đống Đa,Tp. Hà
                Nội results.
                <br />
                Mail: cskh@vnvc.vn results.
                <br />
                Mail: hangtt3@vnvc.vn results.
                <br />
                Bản quyền © 2016 thuộc về{" "}
                <span>CÔNG TY CỔ PHẦN VACXIN VIỆT NAM</span>
              </div>
            </Col>
            <Col span={6}>
              <p>CHÍNH SÁCH BẢO MẬT</p>
              <p>KHẢO SÁT TIÊM CHỦNG</p>
              <Space>
                <img src={dmca} alt="" />
                <img src={dathongbao} alt="" width={"100px"} />
              </Space>
            </Col>
          </Row>
        </div>
      </Style.Footer>
    </>
  );
}
export default Footer;
