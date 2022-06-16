import { Carousel, Space, Row, Col } from "antd";
import React from "react";
import hinhtre1 from "../../../assets/images/tiemtre1.jpg";
import hinhtre2 from "../../../assets/images/tiemtre2.jpg";
import hinhtre3 from "../../../assets/images/tiemtre3.jpg";
import hinhtre4 from "../../../assets/images/tiemtre4.jpg";
import tramyte from "../../../assets/images/tramyte.jpg";

import hd1 from "../../../assets/images/hd1.jpg";
import hd2 from "../../../assets/images/hd2.jpg";
import hd3 from "../../../assets/images/hd3.jpg";
import hd4 from "../../../assets/images/hd4.jpg";
import hd5 from "../../../assets/images/hd5.jpg";
import hd6 from "../../../assets/images/hd6.jpg";

import * as Style from "./styles";

const LISTIMAGE = [
  {
    img: hinhtre1,
  },
  {
    img: hinhtre2,
  },
  {
    img: hinhtre3,
  },
  {
    img: hinhtre4,
  },
];
const LISTIMAGEACTIVE = [
  {
    img: hd1,
  },
  {
    img: hd2,
  },
  {
    img: hd3,
  },
  {
    img: hd4,
  },
  {
    img: hd5,
  },
  {
    img: hd6,
  },
];

function HomePage() {
  const contentStyle = {
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  function renderCarousel() {
    return LISTIMAGE.map((item, index) => {
      return (
        <>
          <div>
            <h3 style={contentStyle}>
              <img src={item.img} alt="" width="100%" height="500" />
            </h3>
          </div>
        </>
      );
    });
  }
  function renderImgActive() {
    return LISTIMAGEACTIVE.map((item, index) => {
      return (
        <>
          <Col span={8} style={{ padding: 10 }}>
            <img src={item.img} alt="" width="100%" />
          </Col>
        </>
      );
    });
  }
  return (
    <>
      <Carousel autoplay>{renderCarousel()}</Carousel>
      <Style.IntroduceContainer className="introduce">
        <div className="title_home_color">
          <h3> Thông tin giới thiệu </h3>
        </div>
        <Space>
          <div className="text">
            <span>
              Trung tâm Y tế xã Mỹ Thắng huyện Phù Mỹ tỉnh Bình Định là đơn vị
              sự nghiệp công lập, có chức năng cung cấp dịch vụ chuyên môn, kỹ
              thuật về y tế dự phòng; khám bệnh, chữa bệnh, phục hồi chức năng
              và các dịch vụ y tế khác theo quy định của pháp luật. Quy mô 160
              giường bệnh theo kế hoạch; 290 số giường bệnh thực kê. - Các phòng
              chức năng (04): Phòng Tổ chức - Hành chính, Phòng Kế hoạch nghiệp
              vụ - Điều dưỡng, Phòng Tài chính Kế toán và Phòng Dân số. - Các
              khoa chuyên môn (13): Khoa Khám bệnh; Khoa Hồi sức cấp cứu; Khoa
              Nội tổng hợp; Khoa Nhi; Khoa Truyền Nhiễm; Khoa Y học cổ truyền;
              Khoa Ngoại tổng hợp; Khoa Chăm sóc sức khỏe sinh sản; Khoa Kiểm
              soát bệnh tật, HIV/AIDS, Y tế công cộng, Dinh dưỡng và An toàn
              thực phẩm (KSBT, HIV/AIDS, YTCC, DD và ATTP); Khoa Xét nghiệm;
              Khoa Dược; Khoa Kiểm soát nhiễm khuẩn; Khoa Dinh dưỡng. - Phòng
              khám đa khoa khu vực (ĐKKV) Bình Dương. Ngoài ra còn có 19 trạm y
              tế xã/thị trấn trực thuộc TTYT, trong đó có 17 xã và 02 thị trấn.
            </span>
          </div>
          <div>
            <img src={tramyte} alt="" width="400px" />
          </div>
        </Space>
      </Style.IntroduceContainer>
      <Style.ImgActiveContainer>
        <div className="title_home_color">
          <h3> Hình ảnh hoạt động </h3>
        </div>
        <Row>{renderImgActive()}</Row>
      </Style.ImgActiveContainer>
    </>
  );
}
export default HomePage;
