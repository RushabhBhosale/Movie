// utils/response.ts

interface ResponseProps {
  status: number;
  message: string;
  body?: object; // Make body optional
}

export function successResponse({ status, message, body = {} }: ResponseProps) {
  return new Response(
    JSON.stringify({
      status,
      message,
      success: true,
      data: body,
    }),
    { status }
  );
}

export function errorResponse({ status, message, body = {} }: ResponseProps) {
  return new Response(
    JSON.stringify({
      status,
      message,
      success: false,
      data: body,
    }),
    { status }
  );
}
