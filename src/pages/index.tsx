import { useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  const handleSignIn = async () => {
    try {
      signIn('facebook')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignOut = async () => {
    try {
      signOut()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="p-10 flex flex-col gap-10">
      {session ? (
        <button className="bg-blue-500 px-5 py-3 text-white rounded" onClick={handleSignOut}>SIGN OUT FROM FACEBOOK</button>
      ) : (
        <button className="bg-blue-500 px-5 py-3 text-white rounded" onClick={handleSignIn}>SIGN IN WITH FACEBOOK</button>

      )}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
