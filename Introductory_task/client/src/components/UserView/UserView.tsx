import "./UserView.css";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchMe } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";

export const UserView: FC = () => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["me"],
    },
    queryClient
  );

  switch (userQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <div className={"user-view"}>
          <div className={"user-view__logo"}>
            {userQuery.data?.username.slice(0, 1).toUpperCase()}
          </div>
          <span className={"user-view__name"}>{userQuery.data?.username}</span>
        </div>
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => userQuery.refetch()}>Повторить запрос</button>
        </div>
      );
  }
};
