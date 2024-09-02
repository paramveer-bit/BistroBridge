'use client'
import handleSignIn from "@/helpers/signInAction"

export default function SignIn() {
  return (
    <form
      action={handleSignIn}
    >
      <button type="submit" >Signin with Google</button>
    </form>
  )
} 
