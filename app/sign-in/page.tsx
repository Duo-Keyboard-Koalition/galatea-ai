"use client";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    alert("Thank you for exploring!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
        <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-earth-800">Sign In</h1>
      <button onClick={handleGoogleSignIn} className="mt-4 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
        Sign in with Google
      </button>
    </div>
  );
}
