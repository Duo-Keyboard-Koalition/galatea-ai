import { ProfileSetupForm } from "@/components/ProfileSetupForm"
import { Header } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ProfileSetup() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-glow">
            Set Up Your <span className="text-teal-400">Profile</span>
          </h1>

          <div className="max-w-2xl mx-auto">
            <div className="glass-effect rounded-lg p-8">
              <ProfileSetupForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
