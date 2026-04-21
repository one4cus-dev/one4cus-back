// src\common\utils\async-handler.ts
//this is the reusable helper function async wrapper

export async function asyncHandler<T>(fn: () => Promise<T>): Promise<T> {
  return await fn();
}