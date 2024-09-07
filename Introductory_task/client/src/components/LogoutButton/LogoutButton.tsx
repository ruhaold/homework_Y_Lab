import { Button } from "../Button";
import "./LogoutButton.css";
import { logout } from "../../api/User";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";

export const LogoutButton = () => {
  const logoutMutation = useMutation(
    {
      mutationFn: () => logout(),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
    },
    queryClient
  );
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className={"logout-button"}>
      <Button
        kind="secondary"
        onClick={handleLogout}
        isLoading={logoutMutation.isPending}
      >
        Выйти
      </Button>
    </div>
  );
};
