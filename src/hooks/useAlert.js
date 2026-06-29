import { useAlertStore } from "@/store/alert";
import { storeToRefs } from "pinia";

export default function useAlert() {
  const alertStore = useAlertStore();
  const { alerts } = storeToRefs(alertStore);
  const { vAlert, vSuccess } = useAlertStore();
  return {
    alerts,
    vAlert,
    vSuccess,
  };
}
