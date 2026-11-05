/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { TicketRedemptionFlow } from './components/TicketRedemptionFlow';
import { AdminDrawer } from './components/AdminDrawer';
import { Footer } from './components/Footer';

function MainApp() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f5f2eb] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Clean Navbar */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Ticket Exchange Experience */}
      <main className="flex-1 flex flex-col justify-center">
        <TicketRedemptionFlow />
      </main>

      {/* Admin / History Drawer */}
      <AdminDrawer isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
