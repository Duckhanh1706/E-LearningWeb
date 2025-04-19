import { memo } from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg3">
            <div className="footer-about">
              <h3 className="footer-about-logo"> E-Learning</h3>

              <ul>
                <li>
                  Address:
                  <a
                    href="https://maps.app.goo.gl/hCHZG71dhwLz2tvo8"
                    target="_blank"
                    title="Km10, Đường Nguyễn Trãi, Q. Hà Đông, Hà Nội"
                  >
                    {" "}
                    Km10, Nguyen Trai Street, Ha Dong District, Hanoi, Vietnam
                  </a>
                </li>
                <li>
                  Phone:
                  <a href="tel:024 3756 2186 " title="phone">
                    {" "}
                    024 3756 2186{" "}
                  </a>
                </li>
                <li>
                  Email:
                  <a href="mailto:E-Learning@gmail.com " title="email">
                    {" "}
                    E-Learning@gmail.com{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg3">
            <h3>Privacy policy and terms</h3>
            <ul>
              <li>
                <a href="https://www.udemy.com/pricing/?ref=footer">
                  Plans & Pricing
                </a>
              </li>
              <li>
                <a href="/affiliate/">Affiliates</a>
              </li>
              <li>
                <a href="/support/">Help & Support</a>
              </li>
            </ul>
          </div>
          <div className="col-lg3">
            <h3>E-Learning Web</h3>
            <ul>
              <li>Tax ID: 0109922901</li>
              <li>
                Field of Operation: Education, Technology – Programming. We
                focus on building and developing products
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer); // 👈 export default ở đây
