export default function SignInPage() {
  const handleGoogleSignIn = () => {
    alert("Thank you for exploring!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Thank you for exploring!</h1>
      <button onClick={handleGoogleSignIn} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
}
