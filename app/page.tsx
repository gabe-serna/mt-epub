"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFile, setHasFile] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/pdf-to-epub", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <Label htmlFor="pdf">
            Upload PDF
            <Input
              type="file"
              name="pdf"
              accept=".pdf"
              className="mt-2"
              required
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setHasFile(true);
                } else {
                  setHasFile(false);
                }
              }}
            />
          </Label>
          <Button type="submit" disabled={!hasFile}>
            Convert
          </Button>
        </form>
      </main>
    </div>
  );
}
