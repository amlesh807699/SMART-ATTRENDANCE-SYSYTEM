"use client";

import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div className={styles.errorWrapper}>
      <h2>Something went wrong</h2>
      <p>{message || "An unexpected error occurred."}</p>
    </div>
  );
};

export default ErrorPage;