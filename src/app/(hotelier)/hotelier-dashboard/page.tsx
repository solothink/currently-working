// app/dashboard/page.tsx
import { Metadata } from 'next';
import PropertiesPage from './Properties';

export const metadata: Metadata = {
  title: 'Hotelier Dashboard',
  description: 'Manage your hotel operations efficiently with the Hotelier Dashboard.',
};


export default async function DashboardPage() {
  return (
    <div className="min-h-screen">
   
      <main className="container ">
       <PropertiesPage />
      </main>
    </div>
  );
}
