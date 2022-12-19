// import React from 'react';
// const Footer = () => (
//   <footer className="footer">
//     <p>Incedo Cricket League@2022 All right reserved</p>
//   </footer>
// );

// export default Footer;

import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <div >
          ©Incedo Cricket League@2022 All right reserved
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
