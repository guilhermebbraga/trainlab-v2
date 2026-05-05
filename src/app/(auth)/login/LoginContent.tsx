"use client"
import { useEffect, useRef } from "react";
import LoginForm from "@/src/components/Forms/LoginForm";
import { AUTH_MESSAGES } from "@/src/constants/messages";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function LoginContent() {
  const searchParams = useSearchParams();
  const messageKey = searchParams.get("message");
  const hasShownToast = useRef(false); // useRef mantém o valor entre renderizações

  useEffect(() => {
    if (messageKey && AUTH_MESSAGES[messageKey] && !hasShownToast.current) {
      toast.error(AUTH_MESSAGES[messageKey], {
        id: "auth-error",
      });
      hasShownToast.current = true;

      window.history.replaceState({}, "", "/login");
    }
  }, [messageKey]);

  return <LoginForm />;
}
