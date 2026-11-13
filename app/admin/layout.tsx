export const metadata = {
  title: "Admin | Startup Karna Hai",
  robots: { index: false, follow: false }, // keep admin pages out of Google
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
