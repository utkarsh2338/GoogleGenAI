import React from 'react';
import { useUser, UserButton, SignOutButton } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-brand">CareerSathi</div>
      <div className="navbar-actions">
        {isSignedIn && (
          <>
            <SignOutButton>
              <button className="signout-btn">Sign Out</button>
            </SignOutButton>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
