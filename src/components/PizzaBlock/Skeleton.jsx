import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (

    <ContentLoader speed={2} width={280} height={465} viewBox="0 0 280 465" backgroundColor="#f3f3f3" foregroundColor="#e6e6e6" {...props} >
    <circle cx="134" cy="122" r="112" />
    <rect x="0" y="252" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="305" rx="0" ry="0" width="280" height="91" />
    <rect x="0" y="426" rx="0" ry="0" width="109" height="24" />
    <rect x="126" y="417" rx="20" ry="20" width="152" height="45" />
        </ContentLoader>
);

export default Skeleton;
