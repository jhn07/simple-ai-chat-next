"use client";

import { useCompletion } from "ai/react"
import { Button } from "@/components/ui/button"
import { Diamond } from "lucide-react"


export default function ChatCompletion() {

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion"
  })

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8">
        <input
          className="w-full max-w-md bottom-0 border border-gray-300 rounded shadow-xl p-2"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
        />
        <Button type="button" variant="ghost" onClick={stop}>
          Stop
        </Button>
        <Button
          disabled={isLoading || !input}
          type="submit"
        >
          {isLoading ? "Loading.." : "Send"}
          <Diamond className={`h-4 w-4 ml-2 ${isLoading && "animate-spin"}`} />
        </Button>
      </form>
      <output>AI result: {completion}</output>
    </div>
  )
}
