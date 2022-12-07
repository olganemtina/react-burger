import { useDispatch } from "react-redux";
import { AppDispatch, AppThunk } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
