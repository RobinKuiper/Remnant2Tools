import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { initialStates } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = typeof window !== "undefined" ? useDispatch : () => null;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  typeof window !== "undefined" ? useSelector : callback => callback(initialStates);
