"use client";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    alert("Thank you for exploring!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Thank you for exploring!</h1>
      <button onClick={handleGoogleSignIn} className="mt-4 p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Sign in with Google
      </button>
    </div>
  );
}
