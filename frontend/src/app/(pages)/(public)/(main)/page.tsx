import { redirect } from "next/navigation";
import getSession from "@/lib/get-session";
import { URLS } from "@/lib/urls";

const MainPage = async () => {
  const session = await getSession();

  if (session) {
    redirect(URLS.dashboard);
  }

  return null;
};

export default MainPage;
