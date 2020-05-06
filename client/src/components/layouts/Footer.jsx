import React from 'react';

export default function Footer() {
  return (
    <>
        <footer className = "app-footer container-fluid">
            <p 
                style = {{ color: "#E8F0FE" }}
                className = "">
                &copy; Copyright {new Date().getFullYear()} VibeHear
            </p>
        </footer>
    </>
  );
}
