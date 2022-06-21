function Info() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "info" }, /*#__PURE__*/
    React.createElement("img", { src: "https://images.theconversation.com/files/247814/original/file-20181128-32230-mojlgr.jpg?ixlib=rb-1.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip", className: "img" }), /*#__PURE__*/
    React.createElement("div", null), /*#__PURE__*/
    React.createElement("h1", null, "Kha Sang"), /*#__PURE__*/
    React.createElement("h3", null, "Frontend Developer"), /*#__PURE__*/
    React.createElement("h4", null, "Student from HCMUT"), /*#__PURE__*/
    React.createElement("div", { className: "buttonArea" }, /*#__PURE__*/
    React.createElement("button", { type: "submit" }, /*#__PURE__*/React.createElement("i", { class: "fa-solid fa-square-envelope" }), " Email"), /*#__PURE__*/
    React.createElement("button", { type: "submit" }, /*#__PURE__*/React.createElement("i", { class: "fa-brands fa-facebook-square" }), " Facebook"))));



}

function Desc() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "desc" }, /*#__PURE__*/
    React.createElement("h3", null, "About"), /*#__PURE__*/
    React.createElement("p", { className: "para" }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"), /*#__PURE__*/
    React.createElement("br", null), /*#__PURE__*/
    React.createElement("h3", null, "Interests"), /*#__PURE__*/
    React.createElement("p", { className: "para" }, "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.")));



}

function Footer() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "footer" }, /*#__PURE__*/
    React.createElement("i", { class: "fa-brands fa-twitter" }), /*#__PURE__*/
    React.createElement("i", { class: "fa-brands fa-linkedin" }), /*#__PURE__*/
    React.createElement("i", { class: "fa-brands fa-instagram-square" }), /*#__PURE__*/
    React.createElement("i", { class: "fa-brands fa-github" })));


}

function Page() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement(Info, null), /*#__PURE__*/
    React.createElement(Desc, null), /*#__PURE__*/
    React.createElement(Footer, null)));


}

ReactDOM.render(Page(), document.getElementById("root"));