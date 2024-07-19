import Navbar from '../components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col px-4">{children}</div>
    </>
  )
}
