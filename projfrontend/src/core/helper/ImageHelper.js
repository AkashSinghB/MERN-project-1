import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://thumbs.dreamstime.com/b/coming-soon-banner-template-ribbon-label-sign-177647453.jpg`;
  return (
    <div className="rounded border border-success">
      <img
        src={imageUrl}
        alt="photos"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          width: "-webkit-fill-available",
        }}
        className="mb-3 rounded "
      />
    </div>
  );
};

export default ImageHelper;
