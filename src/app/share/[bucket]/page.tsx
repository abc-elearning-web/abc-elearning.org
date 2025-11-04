import fs from "fs";
import { notFound } from "next/navigation";
import ShareClient from "./ShareClient";

interface PageProps {
  params: Promise<{ bucket: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SharePage({ params, searchParams }: PageProps) {
  const { bucket } = await params;
  const searchParamsResolved = await searchParams;
  
  if (!bucket) {
    notFound();
  }

  // Build query string from searchParams
  const queryParams = new URLSearchParams();
  
  Object.entries(searchParamsResolved).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.set(key, value);
      }
    }
  });

  const queryParam = searchParamsResolved.query as string | undefined;
  if (queryParam) {
    queryParams.set("type", queryParam);
  }
  queryParams.delete("query");

  const enhancedQuery = queryParams.toString();

  // Read app config
  const data = fs.readFileSync("public/json/app_config.json", "utf-8");
  const appConfigData = JSON.parse(data);
  const appConfig = appConfigData[bucket];

  if (!appConfig) {
    notFound();
  }

  const fullUrl = `/share/${bucket}?${new URLSearchParams(
    Object.entries(searchParamsResolved).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = Array.isArray(value) ? value[0] : value;
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString()}`;

  return (
    <ShareClient
      appConfig={appConfig}
      query={enhancedQuery}
      fullUrl={fullUrl}
    />
  );
}

