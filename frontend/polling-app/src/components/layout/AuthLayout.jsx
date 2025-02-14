import React from "react";

import UI_ELEMENT from '../../assets/images/ui-element.png'
import CARD_1 from '../../assets/images/auth-card-1.png'
import CARD_2 from '../../assets/images/auth-card-2.png'
import CARD_3 from '../../assets/images/auth-card-3.jpg'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Crowd Choice</h2>

        {children}
      </div>

      
    </div>
  );
};

export default AuthLayout;
