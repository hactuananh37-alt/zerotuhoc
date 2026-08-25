import './globals.css';

export const metadata = {
  title: 'ZEROTUHOC - Nền tảng học tập thế hệ mới',
  description: 'Hệ thống tự học tích hợp AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#0b0f19] text-gray-100 antialiased">{children}</body>
    </html>
  );
}
