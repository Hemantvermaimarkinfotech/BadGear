// #This code is written by Hemant Verma

import React from 'react';;
const SkeletonLoader = ({ isLoading, children }) => {
  return (
    <SkeletonContent
      isLoading={isLoading}
      boneColor="#E5E5E5"
      highlightColor="#F2F2F2"
      containerStyle={{ flex: 1 }}
      layout={[
        { key: 'skeleton1', width: '100%', height: 50, marginBottom: 10 },
        { key: 'skeleton2', width: '100%', height: 50, marginBottom: 10 },
      ]}
    >
      {children}
    </SkeletonContent>
  );
};

export default SkeletonLoader;
