import { toast } from "sonner";

export const ShowToastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "#25B16F",
      color: "white",
      border: "1px solid transparent",
    },
  });
};
