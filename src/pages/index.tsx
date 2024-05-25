import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Home() {
  const { data: session } = useSession()

  const handleSignIn = async () => {
    try {
      await signIn('facebook')
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

      {session && (
        <div className="flex justify-between">
          <span>{session?.user?.name} : {session.user.id}</span>
          <div className="w-[3.125rem] h-[3.125rem] relative rounded-full overflow-hidden">
            <Image src={session?.user.image} alt={session.user.name} fill className="object-cover" />
          </div>
        </div>
      )}

      
      <pre className="whitespace-pre-wrap [word-wrap:break-word]">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
