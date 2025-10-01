import { Header } from "@/components/header"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HomeContent />
    </div>
  )
}
