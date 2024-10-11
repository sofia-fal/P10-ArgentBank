import React from 'react';
import AccountData from '../datas/accounts.json';
import Account from '../components/account';
import User from '../components/user';
import '../style/profile.css';

function Profile() {
  return (
    <main className="main bg-dark">
      <User />
      {AccountData.map((data) => (
        <Account
          key={data.id}
          title={data.title}
          amount={data.amount}
          description={data.description}
        />
      ))}
    </main>
  );
}

export default Profile;
