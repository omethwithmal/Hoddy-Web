import React from 'react';

const ShopFooter = () => {
  return (
    <div className="bg-white text-black text-center py-3 text-xs border-t border-white">
      © {new Date().getFullYear()} Hoddy Shop. All rights reserved.
    </div>
  );
};

export default ShopFooter;