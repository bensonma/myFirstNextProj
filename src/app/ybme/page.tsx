import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YBME, LLC',
  description: 'YBME, LLC — real estate holding and rental company.',
};

const CHECKOUT_URL = 'https://bit.ly/9034THC';

const Page = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="border-b border-slate-200 px-8 py-8 dark:border-slate-800">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Real Estate Holding &amp; Rentals
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            YBME, LLC
          </h1>
        </header>

        <div className="space-y-8 px-8 py-8">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">About Us</h2>
            <p className="mt-2 leading-relaxed">
              YBME, LLC is a real estate holding and rental company. The payment
              link below is for the application fee for rental properties that we
              hold. No goods are sold.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Payment Terms</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>All payments are in U.S. dollars (USD).</li>
              <li>All sales and payments are final. There are no refunds.</li>
            </ul>
          </section>

          <section className="rounded-xl bg-slate-100 p-6 text-center dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Rental Application Fee</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Continue to our secure checkout page to pay your application fee.
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Go to Checkout
            </a>
            <p className="mt-3 break-all text-xs text-slate-500">{CHECKOUT_URL}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
            <address className="mt-2 space-y-1 not-italic">
              <p className="font-medium">YBME, LLC</p>
              <p>
                <a href="tel:+17044569758" className="hover:underline">
                  (704) 456-9758
                </a>
              </p>
              <p>
                <a href="mailto:ybme_llc@themahouse.com" className="hover:underline">
                  ybme_llc@themahouse.com
                </a>
              </p>
            </address>
          </section>
        </div>

        <footer className="border-t border-slate-200 px-8 py-4 text-center text-xs text-slate-500 dark:border-slate-800">
          &copy; {new Date().getFullYear()} YBME, LLC. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default Page;
