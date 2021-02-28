import React from "react";

import { MyDevFriends } from "@components/dev-friends/MyDevFriends";
import { PageLayout } from "@components/generic/page-layout/PageLayout";

export const Home = (): JSX.Element => {
  return (
    <PageLayout>
      <MyDevFriends />
    </PageLayout>
  );
};

export default Home;
