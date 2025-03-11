import getSession from "@/lib/get-session";
import "@/styles/globals.css";

export default async function MainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <section>
      <main>
        {session?.user ? (
          <section className="flex border w-full">
            <div className="grow">
              <main>{children}</main>
            </div>
          </section>
        ) : (
          <>{/* TODO: add landing page here */}</>
        )}
      </main>
    </section>
  );
}
