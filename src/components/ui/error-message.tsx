"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  message: string
  className?: string
  retryAction?: () => void
}

export function ErrorMessage({ message, className, retryAction }: ErrorMessageProps) {
  return (
    <div className={cn("bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center", className)}>
      <div className="flex items-center justify-center mb-2">
        <AlertCircle className="h-6 w-6 text-red-400 mr-2" />
        <h4 className="text-red-400 font-medium">Ocorreu um erro</h4>
      </div>
      <p className="text-gray-300 mb-4">{message}</p>
      {retryAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={retryAction}
          className="bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-white gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  )
}

