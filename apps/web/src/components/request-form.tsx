"use client";

import { useState } from "react";
import { z } from "zod";

export const requestSchema = z.object({
  title: z.string().trim().min(5, "Use at least 5 characters"),
  description: z.string().trim().min(20, "Use at least 20 characters"),
  type: z.enum(["EQUIPMENT", "ACCESS", "TRAVEL", "OTHER"]),
});

type FormErrors = Partial<
  Record<"title" | "description" | "type", string>
>;

export function RequestForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [preview, setPreview] = useState<z.infer<
    typeof requestSchema
  > | null>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const result = requestSchema.safeParse({
      title: data.get("title"),
      description: data.get("description"),
      type: data.get("type"),
    });

    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      setErrors({
        title: fields.title?.[0],
        description: fields.description?.[0],
        type: fields.type?.[0],
      });
      setPreview(null);
      return;
    }

    setErrors({});
    setPreview(result.data);
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="mt-1 w-full rounded border p-2"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" role="alert" className="text-sm text-red-700">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="block font-medium">
          Type
        </label>
        <select id="type" name="type" className="mt-1 w-full rounded border p-2">
          <option value="EQUIPMENT">Equipment</option>
          <option value="ACCESS">Access</option>
          <option value="TRAVEL">Travel</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          className="mt-1 w-full rounded border p-2"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        {errors.description && (
          <p
            id="description-error"
            role="alert"
            className="text-sm text-red-700"
          >
            {errors.description}
          </p>
        )}
      </div>

      <button className="rounded bg-blue-700 px-4 py-2 text-white">
        Preview request
      </button>

      {preview && (
        <div role="status" className="rounded border bg-blue-50 p-4">
          <p className="font-medium">Valid demo request—not saved</p>
          <p>{preview.title}</p>
          <p className="text-sm">{preview.description}</p>
        </div>
      )}
    </form>
  );
}
