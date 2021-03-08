import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  //state dánh sách phim
  state = {
    arrFilms: [],
  };
  loadFilm = () => {
    //dùng axios lấy thông tin từ backend về qua api
    const promise = axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      method: "GET",
    });
    //xử lý thành công
    promise.then((result) => {
      console.log("result", result.data);
      this.setState({
        arrFilms: result.data,
      });
    });
    //xử lý khi request lỗi
    promise.catch((error) => {
      console.log("err", error.response.data);
    });
  };

  renderPhim = () => {
    return this.state.arrFilms.map((film, index) => {
      return (
        <div className="col-4 py-3" key={index}>
          <div className="card text-left">
            <img
              className="card-img-top"
              src={film.hinhAnh}
              alt={film.hinhAnh}
              style={{ maxWidth: "100%", height: 350 }}
            />
            <div className="card-body bg-dark text-light">
              <h4 className="card-title">{film.tenPhim}</h4>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="container">
        {/* <button
          className="btn btn-dark my-2 my-sm-0"
          onClick={() => {
            this.loadFilm();
          }}
        >
          Lấy danh sách phim
        </button> */}
        <div className="text-center display-4">Danh sách phim</div>
        <div className="row">{this.renderPhim()}</div>
      </div>
    );
  }
  //hàm giống hàm render của react component kế thừa nên có
  componentDidMount() {
    //các api muốn gọi sau khi giao diện render thì sẽ gọi trong hàm này
    this.loadFilm();
  }
}
