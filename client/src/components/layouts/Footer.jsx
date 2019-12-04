import React from 'react';

export default function Footer() {
  return (
    <>
        <footer className = "app-footer container-fluid">
            <p className = "text-white">
                &copy; Copyright {new Date().getFullYear()} Odekunle Oluwatobi Alao
            </p>
        </footer>
    </>
  );
}
